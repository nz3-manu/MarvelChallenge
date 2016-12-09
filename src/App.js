import React, { Component } from 'react';
import md5 from 'md5';
import './App.css';

var TitleComits = React.createClass({
  render: function() {
    return (
      <ul> {this.props.name} </ul>
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
    return (
      <div>
        <input ref="textBox" type="text" />
          <div>
            < TitleComits name= {
              (this.state.comits) ? this.state.comits.map((itemComits, i) => {return <h1 key={i}>{itemComits.name}</h1>}) : "no"

            }/>

          </div>


      </div>
    );
  }
});

export default App;
