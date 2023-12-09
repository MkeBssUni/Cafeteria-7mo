import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './shared/css/bootstrap.min.css';
import './shared/css/color.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

//Manejo de color
const tema=(localStorage.getItem('darkMode') ? 'ligth' : 'dark')
document.documentElement.setAttribute('theme', tema)

switch(localStorage.getItem('letter_size')){
    case "Mediana":
        document.documentElement.setAttribute('letter-size','Mediana')
    case "Pequeña":
        document.documentElement.setAttribute('letter-size','Pequeña')
    case "Grande":
        document.documentElement.setAttribute('letter-size','Grande')
}
    