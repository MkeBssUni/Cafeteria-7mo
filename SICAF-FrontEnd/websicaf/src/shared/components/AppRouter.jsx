import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreens from '../../modules/auth/LoginScreens';
import ProductList from '../../modules/product/ProductList';
import OffersList from '../../modules/offers/OffersList'

const AppRouter = () => {

  return (
    <Router>
        <Routes>
            {/* Recuerda colocar las rutas aqui */}
            <Route path="/auth" element={<LoginScreens/>}/>
            {/* Productos las rutas */}
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/offers" element={<OffersList/>}/>
            
        </Routes> 
    </Router>
  )
}

export default AppRouter