import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board'
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Board),
    document.getElementById('root')
  );
});
