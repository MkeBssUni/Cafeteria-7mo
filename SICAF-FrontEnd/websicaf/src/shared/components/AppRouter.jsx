import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreens from '../../modules/auth/LoginScreens';
import OrdersScreens from '../../modules/orders/OrdersScreens';
import UsersScreens from '../../modules/users/UsersScreens';
import UserForm from '../../modules/users/components/UserForm';
import Navbar from '../../shared/components/Navbar';
import UserEdt from '../../modules/users/components/UserEdt';
import HistoryScreens from '../../modules/History/HistoryScreens';

const AppRouter = () => {

  return (
    <Router>
    <Navbar/>
        <Routes>
            {/* Recuerda colocar las rutas aqui */}
            <Route path="/orders" element={< OrdersScreens/>}/>
            <Route path="/users" element={< UsersScreens/>}/>
            <Route path="/userform" element={< UserForm/>}/>
            <Route path="/useredt" element={< UserEdt/>}/>
            <Route path="/history" element={< HistoryScreens/>}/>
            {/* Productos las rutas */}
        </Routes> 
    </Router>
  )
}

export default AppRouter