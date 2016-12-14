import React, {Component} from 'react';
import md5 from 'md5';
import './App.css';
import Modal from 'react-modal';
import MyFavouritesComics from './MyFavouritesComics.js';
import WrapComics from './WrapComics.js';

/* Principal component */
var App = React.createClass({
    getInitialState: function() {
        return {}
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
                <div className="wrapContainerFavourites">
                    <div className="wrapContainer">
                        <div className="wrapContainer__sortBy">
                            <div className="sortBy__imgCharact">
                                <img src="/icons/characters.png" height="40px" alt="Characters"/>
                                <h2>Characters</h2>
                            </div>
                            <div className="sortBy__btnSorBy">
                                <p>
                                    Sort by
                                </p>
                                <img src="/icons/btn_arrow_down.png" height="40px" alt="Characters"/>
                            </div>
                        </div>
                        {(this.state.Comics)
                            ? this.state.Comics.map((ComicInfo, i) => <WrapComics img={`${ComicInfo.thumbnail.path}.${ComicInfo.thumbnail.extension}`} name={ComicInfo.name} description={ComicInfo.description} key={i} index={i}/>)
                            : "waiting..."
}
                    </div>
                    < MyFavouritesComics />
                </div>
            </div>
        );
    }
});
export default App;
