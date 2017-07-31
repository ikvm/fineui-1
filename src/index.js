import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './example/App';

import 'reset.css';

ReactDOM.render(<App style={{color: 'red'}}/>,
    document.getElementById('app')
);
