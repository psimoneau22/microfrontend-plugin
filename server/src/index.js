import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// declare shared dependencies as externals / global
window.React = React;

ReactDOM.render(<App />, document.querySelector("#root"))
