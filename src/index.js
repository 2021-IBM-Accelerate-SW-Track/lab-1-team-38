import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import todosData from "./todosData";

ReactDOM.render(
     <App tasks = {todosData}/>,
  document.getElementById('root')
);


