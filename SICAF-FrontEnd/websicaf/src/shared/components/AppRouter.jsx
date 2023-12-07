import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreens from "../../modules/auth/LoginScreens";
import RecoryPassword from "../../modules/auth/RecoryPassword";
import OrdersScreens from "../../modules/orders/OrdersScreens";
import UsersScreens from "../../modules/users/UsersScreens";
import UserForm from "../../modules/users/components/UserForm";
import Navbarsicaf from "./Navbar";
import UserEdt from "../../modules/users/components/UserEdt";
import HistoryScreens from "../../modules/History/HistoryScreens";
import Welcome from "./Welcome";
import ProductList from '../../modules/product/clientViews/ProductList';
import OffersList from '../../modules/offers/OffersList'
import  ProductDashborad from '../../modules/product/adminViews/ProductDashbBoard'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbarsicaf />
              <br/>
              <Routes>
                <Route path="/welcome" element={<Welcome/>} />
                <Route path="/orders" element={<OrdersScreens/>}/>
                <Route path="/users" element={<UsersScreens/>}/>
                <Route path="/userform" element={<UserForm/>}/>
                <Route path="/useredt" element={<UserEdt/>}/>
                <Route path="/history" element={<HistoryScreens/>}/>
                <Route path="/products" element={<ProductList/>}/>
                <Route path="/offers" element={<OffersList/>}/>
                <Route path="/productAdmin" element={<ProductDashborad/>}/>
              </Routes>
            </>
          }
        />
        <Route path="/login" element={<LoginScreens />} />
        <Route path="/recoveryPassword" element={<RecoryPassword />} />
      </Routes>

    </Router>
  );
};

export default AppRouter;
