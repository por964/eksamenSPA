import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import facade from './apiFacade';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

ReactDOM.render(<AppWithRouter />, document.getElementById("root"));