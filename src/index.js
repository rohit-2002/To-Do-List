import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TodoLayer } from './context/TodoContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <TodoLayer>
      <App />
    </TodoLayer>
  </Router>
);
