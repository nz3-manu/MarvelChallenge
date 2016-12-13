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
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var ViewMore = React.createClass({
 render:function () {
    return (
        <div className="fullScreenColor">
              <div className="wrap__fullScreenColor">
                <div className="fullScreenColor__ImgDescription">
                  <img className="fullScreen__Img" src = {this.props.imgCurrentCmc}/>
                  <h3> {this.props.titleCurrentCmc} </h3>
                  <p> {this.props.descripCurrentCmc} </p>
               </div>
                <div className="fullScreenColor__btn">
                    <button type="button" name="ADDED TO FAVOURITES"></button>
                    <button type="button" name="BUY"></button>
                </div>
              </div>
        </div>
    )
  }
});

var WrapComics = React.createClass({
  getInitialState: function() {
    return { modalIsOpen: false };
  },
  openModal: function() { this.setState({modalIsOpen: true});
  },
  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  btnViewMore: function(i) {
    this.openModal();
    var currentComics = this.state.Comics;
      <ViewMore imgCurrentCmc={`${currentComics[i].thumbnail.path}.${currentComics[i].thumbnail.extension}`}  titleCurrentCmc = {currentComics[i].name}  descripCurrentCmc={currentComics.description}/>;

  },
  render: function() {
    return (
        <div className="wrapPrincipal">

        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles}>
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
                <button type="button"  onClick={this.btnViewMore.bind(null,this.props.index)} className="btn btn-danger"> View more</button>
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
                    (this.state.Comics) ? this.state.Comics.map((arrayComics, i) =>
                    <WrapComics img={`${arrayComics.thumbnail.path}.${arrayComics.thumbnail.extension}`} name={arrayComics.name} description={arrayComics.description} thumbnails={this.btnViewMore} key={i} index={i}/>)
                    : "waiting..."
                  }
                  </div>
                  <div className="wrapFavourites">
                    <div className="nav_Favourites">
                        <img src="/icons/btn-favourites-primary.png" width="50px" height="50px" alt="search"/>
                        <h2 className="textFavourites">My Favourites</h2>
                    </div>
                      <ViewMore/>
                  </div>
            </div>
      </div>
    );
  }
});
export default App;
