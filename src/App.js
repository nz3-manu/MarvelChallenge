import React, { Component } from 'react';
import md5 from 'md5';
import './App.css';
var Modal = require('react-modal');

var Favourites = React.createClass({
  render: function () {
      return (
        <div>
          <img src = {this.props.imgFavo}/>
          <h3> {this.props.textFavo} </h3>
        </div>
      )
    }
});

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   :'rgba(106, 102, 103, 0.85)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    background            : 'white',
    marginRight           : '-50%',
    transform             : 'translate(-40%, -40%)'
  }
};

var ViewMore = React.createClass({
 render:function () {
    return (
      <div className="fullScreenColor">
            <div className="wrap__fullScreenColor">
              <button className="closeFullScreen" onClick={this.closeModal}>X</button>
              <div className="fullScreenColor__ImgDescription">
                  <img className="fullScreen__Img" src = "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg"/>
                <div className="tittleDescription__wrap">
                  <h3> A-Bomb (HAS) </h3>
                  <p> Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! </p>
                </div>
             </div>
              <div className="fullScreenColor__btn">
                  <div className="btnC"><img src="/icons/btn-favourites-primary.png" width="50px" height="50px" alt=""/><p className="btnF_text">ADDED TO FAVOURITES</p></div>
                  <div className="btnC"><img src="/icons/btn-favourites-primary.png" width="50px" height="50px" alt=""/><p className="btnF_text">BUY</p></div>
              </div>
            </div>
        </div>
    )
  }
});

var WrapComics = React.createClass({
  getInitialState: function() {
    return { modal: {modalIsOpen: false}}
  },
  openModal: function() {
    this.setState({modal:{
      modalIsOpen: true,
      currentComics: this.props}});
  },
  closeModal: function() {
    console.log("cerrando");
    this.setState({ modal: { modalIsOpen: false}})
  },
  render: function() {
    return (
        <div className="wrapPrincipal">
        <Modal isOpen = {this.state.modal.modalIsOpen} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">

          <ViewMore />
        </Modal>

            <div className="wrapPrincipal__img">
                <img height="200px" width="200px" className="img-circle" src={this.props.img}/>
                <h3> Related comics </h3>
                <p> Related comics  </p>
                <p> Related comics </p>
            </div>
            <div className="wrapPrincipal__title">
                <h1> {this.props.name} </h1>
                <p> {this.props.description} </p>
                <button type="button"  onClick={this.openModal} className="btn btn-danger"> View more</button>
                <p> Related comics </p>
                <p> Related comics </p>
            </div>
      </div> )
  }
});


/* Principal component */
var App = React.createClass ({
  getInitialState: function() {
    return {  }
  },
   componentWillMount: function() {
     this.search()
  },
  updateSearch: function() {
    this.search(this.refs.query.value)
  },
  search: function (query = "a") {
    var ts = Date.now();
    var privateKey = 'bad9d9b6858465b85f02e3b333d36e2b2220f599';
    var publicKey = 'c57e6859e9459a4c9eef30559c5f5cea';
    var hash = md5( ts + privateKey + publicKey);
    var url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
   fetch(url).then(ComicsApi => ComicsApi.json()).then(ComicsApi => {
         this.setState({ Comics: ComicsApi.data.results });
       })
  },
  render: function() {
    return (
      <div className = "wrap">
          <nav className="navPrincipal">
            <div className="navPrincipal__brand">
                  <img src="/icons/marvel.png" width="150px" height="60px" alt="brand"/>
            </div>
            <div className="navPrincipal__text">
              <input ref="query" className="formSearch" placeholder="Search" onChange={(e)=>{this.updateSearch();}} type="text" />
                  <img src="/icons/search.png" width="50px" height="50px" alt="search"/>
            </div>
          </nav>
              <div className="wrapContainerFavourites">
                  <div className="wrapContainer">
                <div className="wrapContainer__sortBy">
                    <div className="sortBy__imgCharact">
                        <img src= "/icons/characters.png" height="40px" alt="Characters"/>
                        <h2>Characters</h2>
                    </div>
                    <div className="sortBy__btnSorBy">
                      <p> Sort by </p>
                      <img src= "/icons/btn_arrow_down.png" height="40px" alt="Characters"/>
                    </div>
                </div>
                  {
                    (this.state.Comics) ? this.state.Comics.map((ComicInfo, i) =>
                    <WrapComics img={`${ComicInfo.thumbnail.path}.${ComicInfo.thumbnail.extension}`}  name={ComicInfo.name} description={ComicInfo.description} key={i} index={i}/>)
                    : "waiting..."
                  }
                  </div>
                  <div className="wrapFavourites">
                    <div className="nav_Favourites">
                        <img src="/icons/btn-favourites-primary.png" width="50px" height="50px" alt="search"/>
                        <h2 className="textFavourites">My Favourites</h2>
                    </div>


                  </div>
            </div>
      </div>
    );
  }
});
export default App;
