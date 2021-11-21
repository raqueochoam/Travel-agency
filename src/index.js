import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Heading from './Heading.js';

ReactDOM.render(
  <React.StrictMode>
    <Heading />
  </React.StrictMode>,
  document.getElementById('root')
);

//Test Edgar 2

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
