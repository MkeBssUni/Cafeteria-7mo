import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreens from '../../modules/auth/LoginScreens';
import Welcome from './Welcome';
import RecoryPassword from '../../modules/auth/RecoryPassword';

const AppRouter = () => {

  return (
    <Router>
        <Routes>
            {/* Recuerda colocar las rutas aqui */}
            <Route path="/auth" element={<LoginScreens/>}/>
            <Route path='/welcome' element={<Welcome/>} />
            <Route path='/recoveryPassword' element={<RecoryPassword/>}/>
            {/* Productos las rutas */}
            
        </Routes> 
    </Router>
  )
}

export default AppRouter