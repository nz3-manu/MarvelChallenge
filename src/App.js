import React from 'react';
import md5 from 'md5';
import './App.css';
import WrapComics from './WrapComics.js';
import MyFavouritesComics from './MyFavouritesComics.js';

/* Principal component */
var App = React.createClass({
    getInitialState: function() {
      let favorite = this.getProxyState("favorite")
      let initialState = {favorite}
      return initialState
    },
    proxySetState: function(state){
        let stateKeys = Object.keys(state)
        stateKeys.forEach((key)=>{
          localStorage.setItem(key, JSON.stringify(state[key]));
        })
        this.setState(state)
    },
    getProxyState:function(stateKey){
      return JSON.parse(localStorage.getItem(stateKey));
    },
    componentWillMount: function() {
         this.search()
    },
    updateSearch: function() {
          this.search(this.refs.query.value)
    },
    search: function(query = "a") {
        var ts = Date.now();
        var privateKey = 'bad9d9b6858465b85f02e3b333d36e2b2220f599';
        var publicKey = 'c57e6859e9459a4c9eef30559c5f5cea';
        var hash = md5(ts + privateKey + publicKey);
        var url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
       fetch(url).then(ComicsApi => ComicsApi.json()).then(ComicsApi => {
            this.proxySetState({Comics: ComicsApi.data.results});
        })
    },
    showTenComics: function(i) {
        i = (null == i)
            ? 0
            : i;
        let longArrayComics = this.getProxyState('Comics').length
        let limiteInferior = i;
        let limiteSuperior = ((i + 10) > longArrayComics) ? longArrayComics : (i + 10)
        this.proxySetState({limiteInferior, limiteSuperior})
    },
    addFavorite: function(img, name) {
        let favotiteComic = this.getProxyState("favorite")
        favotiteComic = (!favotiteComic) ? []: favotiteComic;
        let arrayName = favotiteComic.map((findName) => findName.name);
        let findDuplicateName = arrayName.indexOf(name);
        var longArrayFavorite = favotiteComic.length
        if ((-1 === findDuplicateName) && (longArrayFavorite < 4)) {
            favotiteComic.push({"img": img, "name": name});
              this.proxySetState({favorite: favotiteComic})
        } else {
            let message = (longArrayFavorite < 4)?( "*The comic is already in favorites"):("*It is allowed only 4 comics favorites");
            this.proxySetState({error: message})
        }

    },
    deleteComic: function(i) {
        const favotiteComic = this.getProxyState("favorite");
        favotiteComic.splice(i, 1);
        this.proxySetState({favorite: favotiteComic});
    },
    clearError: function() {
        this.proxySetState({error: ""})
    },
    paginationBtn: function() {
        var paginationBtn = [];
        if (this.getProxyState("Comics")) {
            for (let i = 0; i < this.getProxyState("Comics").length; i += 10) {
                paginationBtn.push(
                    <button type="button" onClick={this.showTenComics.bind(null, i)} className="btnToolbar" key={i}>
                        {i}
                    </button>
                );
            }
            return paginationBtn;
        }
    },
    render: function() {
        var actualPagination = [];
        if (this.getProxyState("Comics")) {
          let limiteInferior = (this.getProxyState("limiteInferior"))? this.getProxyState("limiteInferior") : 0
          let limiteSuperior = (this.getProxyState("limiteSuperior"))? this.getProxyState("limiteSuperior") : 10
            for (let i = limiteInferior; i < limiteSuperior; i++) {
                let ComicInfo = this.getProxyState("Comics")[i];
                let thumbnail = (ComicInfo.thumbnail)? `${ComicInfo.thumbnail.path}.${ComicInfo.thumbnail.extension}` : "http://placehold.it/200x200"
                let ComicActual = <WrapComics appState={this.addFavorite} showMessage={this.getProxyState("error")} deleteMessage={this.clearError} img={thumbnail} name={ComicInfo.name}  description={ComicInfo.description} key={i} index={i}/>
                actualPagination.push(ComicActual);
            };
        }
        return (
            <div className="wrap">
                <nav className="navPrincipal">
                    <div className="navPrincipal__brand">
                        <img src="/icons/marvel.png" width="150px" height="60px" alt="brand"/>
                    </div>
                    <div className="navPrincipal__text">
                        <input ref="query" className="formSearch" placeholder="Search" onKeyDown={(e)=>{(e.keyCode == 13) && this.updateSearch()}} type="text"/>
                        <img src="/icons/search.png" id="searchComics" width="50px" height="50px" onClick={this.updateSearch} alt="search"/>
                    </div>
                </nav>
                <div className="wrap__sectionSearchBySidebar">
                    <div className="wrap__sectionSearchBy">
                        <div className="wrap__SearchBy">
                            <div className="searchBy__container">
                                <img src="/icons/characters.png" height="40px" alt="Characters"/>
                                <h2>Characters</h2>
                            </div>


                            <div className="searchBy__iconText">
                                <p className="sortByText">
                                    Sort by
                                </p>
                                <img className="DropDownListSearch" src="/icons/btn_arrow_down.png" height="40px" alt="DropDown-Characters"/>
                            </div>



                        </div>

                        {actualPagination}

                        <div className="wrap__toolbar">
                            <button type="button" className="btnToolbar">
                                &#60;
                            </button>
                            {this.paginationBtn()}
                            <button type="button" className="btnToolbar">
                                &#62;
                            </button>
                        </div>

                    </div>
                    <sidebar className="wrap__aside">
                        <div className="aside__nav">
                            <img src="/icons/btn-favourites-primary.png" width="50px" height="50px" alt="btn-search"/>
                            <h2 className="textFavourites">
                                My Favourites</h2>
                        </div>
                        {(this.getProxyState("favorite"))
                            ? this.getProxyState("favorite").map((favoriteComic, i) => (<MyFavouritesComics imgFavoriteComic={favoriteComic.img} deleteComic={this.deleteComic.bind(null, i)} nameFavoriteComic={favoriteComic.name} index={i} key={i}/>))
                            : ""}
                    </sidebar>
                </div>

                <div className="wrap__footer">
                  <div className="footer__text"><short>Grability 2016 - Todos los derechos reservados </short></div>
                  <div className="footer__img"><img src="/icons/grab-logo-circle@3x.png" width="50px" alt="icon-GRABILITY SAS"/></div>
              </div>

            </div>
        );
    }
});
export default App;
