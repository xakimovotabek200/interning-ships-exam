import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';


let global_url = 'http://192.168.1.139:80/api/v1/'
axios.defaults.baseURL = global_url;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
