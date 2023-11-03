import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreens from '../../modules/auth/LoginScreens';

const AppRouter = () => {

  return (
    <Router>
        <Routes>
            {/* Recuerda colocar las rutas aqui */}
            <Route path="/auth" elemnt={<LoginScreens/>} />
            {/* Productos las rutas */}
        </Routes>
    </Router>
  )
}

export default AppRouter