import React, { Component } from 'react';
import md5 from 'md5';
import './App.css';

var WrapC = React.createClass({
  render: function() {
    return (
      <div>
          <img src={this.props.img}/>
          <h1>{this.props.name}</h1>
          <p>{this.props.description}</p>
      </div>
    )
  }
});

var App = React.createClass ({
  getInitialState: function() {
    return {  }
  },
   componentWillMount: function() {
     var ts = Date.now();
     var privateKey = 'bad9d9b6858465b85f02e3b333d36e2b2220f599';
     var publicKey = 'c57e6859e9459a4c9eef30559c5f5cea';
     var hash = md5( ts + privateKey + publicKey);
     var url = `https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(url).then(comitsApi => comitsApi.json()).then(comitsApi => {
          this.setState({ comits: comitsApi.data.results });
        })
  },
  render: function() {
    console.log(this.state.comits);
    return (
      <div>
        <input ref="textBox" type="text" />
          <div>
    {(this.state.comits) ? this.state.comits.map((itemC) => <WrapC img={itemC.thumbnail.path} name={itemC.name} description={itemC.description} />) : "waiting..."}
          </div>
      </div>
    );
  }
});

export default App;
