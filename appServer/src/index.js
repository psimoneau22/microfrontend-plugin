import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// declare shared dependencies as externals / global (see pluginServer/webpack.config :: externals)
window["com.blackdiamond.shared"] = {
    dependencies: {
        React,
    }
}

ReactDOM.render(<App />, document.querySelector("#root"))
