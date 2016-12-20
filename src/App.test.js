import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MockLocalStorage from 'mock-localstorage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    var mockLocalStorage = new MockLocalStorage();
    ReactDOM.render(
        <App/>, div);
});
