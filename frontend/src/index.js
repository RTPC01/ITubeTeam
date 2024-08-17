import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from "./components/Layout/Header";
import {AuthProvider} from "./components/Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //     <AuthProvider>
  //         <Header/>
  //         <App />
  //     </AuthProvider>
  // </React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
);

reportWebVitals();
