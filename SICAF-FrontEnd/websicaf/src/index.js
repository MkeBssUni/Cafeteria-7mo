import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './shared/css/bootstrap.min.css';
import './shared/css/color.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

var toggle = document.getElementById("theme-toggle");

var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme)
    // document.documentElement.setAttribute('theme', 'dark')
    document.documentElement.setAttribute('theme', 'light')
    document.documentElement.setAttribute('letter-size','Grande')
    // document.documentElement.setAttribute('letter-size','Mediana')
    // document.documentElement.setAttribute('letter-size','Pequeña')
    // document.documentElement.setAttribute('data-bs-theme', 'dark')
