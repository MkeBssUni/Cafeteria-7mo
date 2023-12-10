import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./shared/css/bootstrap.min.css";
import "./shared/css/color.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

//Manejo de color
const tema = localStorage.getItem("darkMode");
console.log(tema)
if(tema == "true"){
    document.documentElement.setAttribute("theme", "dark");
    document.documentElement.setAttribute("data-bs-theme", "dark");
}else {
    document.documentElement.setAttribute("theme", "light");
}
const typeSize = localStorage.getItem("letter_size");
document.documentElement.setAttribute("letter-size", typeSize);
