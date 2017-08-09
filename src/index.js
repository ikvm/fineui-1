import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './example/App';
import { AppContainer } from 'react-hot-loader'

import 'reset.css';
import './layout'

ReactDOM.render(
    <App style={{ color: 'red' }} />,
    document.getElementById('app')
);