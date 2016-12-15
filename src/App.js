import React, {Component} from 'react';
import md5 from 'md5';
import './App.css';
import Modal from 'react-modal';
import WrapComics from './WrapComics.js';
import MyFavouritesComics from './MyFavouritesComics.js';

/* Principal component */
var App = React.createClass({
    getInitialState: function() {
        return {favorite: []}
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
            this.setState({Comics: ComicsApi.data.results});
        })
    },
    addFavorite: function(img, name) {
        const favotiteComic = this.state.favorite
        favotiteComic.push({"img": img, "name": name});
        this.setState({favorite: favotiteComic})
    },
    render: function() {
        return (
            <div className="wrap">
                <nav className="navPrincipal">
                    <div className="navPrincipal__brand">
                        <img src="/icons/marvel.png" width="150px" height="60px" alt="brand"/>
                    </div>
                    <div className="navPrincipal__text">
                        <input ref="query" className="formSearch" placeholder="Search" onChange={(e) => {
                            this.updateSearch();
                        }} type="text"/>
                        <img src="/icons/search.png" width="50px" height="50px" alt="search"/>
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
                                <p>
                                    Sort by
                                </p>
                                <img src="/icons/btn_arrow_down.png" height="40px" alt="Characters"/>
                            </div>
                        </div>
                        {(this.state.Comics)
                            ? this.state.Comics.map((ComicInfo, i) => (<WrapComics appState={this.addFavorite} img={`${ComicInfo.thumbnail.path}.${ComicInfo.thumbnail.extension}`} name={ComicInfo.name} description={ComicInfo.description} key={i} index={i}/>))
                            : "waiting..."
}
                    </div>
                    <sidebar className="wrap__aside">
                        <div className="aside__nav">
                            <img src="/icons/btn-favourites-primary.png" width="50px" height="50px" alt="btn-search"/>
                            <h2 className="textFavourites">
                                My Favourites</h2>
                        </div>
                        {(this.state.favorite)
                            ? this.state.favorite.map((favoriteComic, i) => (<MyFavouritesComics imgFavoriteComic={favoriteComic.img} nameFavoriteComic={favoriteComic.name} key={i}/>))
                            : "no"}
                    </sidebar>
                </div>
            </div>
        );
    }
});
export default App;
