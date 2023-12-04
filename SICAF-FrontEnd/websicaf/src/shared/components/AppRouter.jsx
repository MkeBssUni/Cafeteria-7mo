import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreens from '../../modules/auth/LoginScreens';
import OrdersScreens from '../../modules/orders/OrdersScreens';
import UsersScreens from '../../modules/users/UsersScreens';
import UserForm from '../../modules/users/components/UserForm';
import Navbar from '../../shared/components/Navbar';
import UserEdt from '../../modules/users/components/UserEdt';
import HistoryScreens from '../../modules/History/HistoryScreens';
import Welcome from './Welcome';
import RecoryPassword from '../../modules/auth/RecoryPassword';

const AppRouter = () => {

  return (
    <Router>
    <Navbar/>
        <Routes>
            {/* Recuerda colocar las rutas aqui */}
            <Route path="/auth" element={<LoginScreens/>}/>
            {/* Productos las rutas */}
        </Routes> 
    </Router>
  )
}

export default AppRouter