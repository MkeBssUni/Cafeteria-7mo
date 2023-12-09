import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreens from "../../modules/auth/generalViews/LoginScreens";
import RecoryPassword from "../../modules/auth/generalViews/RecoryPassword";
import Navbarsicaf from "./Navbar";
import Welcome from "./Welcome";
import { AuthContext } from "../../modules/auth/authContext";
import RouterClient from "./Router/RouterClient";
import RouterError from "./Router/RouterError";
import RouterEmploy from "./Router/RouterEmploy";
import RouterGerent from "./Router/RouterGerent";
import ProductList from "../../modules/product/clientViews/ProductList";
import OffersList from "../../modules/offers/OffersList";
import OrdersScreens from "../../modules/orders/OrdersScreens";

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const userRole = localStorage.getItem("userRole");
  const renderUserRoleRouter = (userRole) => {
    switch (userRole) {
      case "Gerente":
        return <RouterGerent />;
      case "Empleado":
        return <RouterEmploy />;
      case "Cliente":
        console.log("Entro aquí");
        return <></>;
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreens />} />
        <Route path="/recoveryPassword" element={<RecoryPassword />} />
        <Route
          path="/*"
          element={
            user.isLogged ? (
              <>
                <Navbarsicaf />
                <Routes>
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="orders" element={<OrdersScreens />} />
                  <Route path="products" element={<ProductList />} />
                  <Route path="offers" element={<OffersList />} />
                </Routes>
              </>
            ) : (
              <>
                <LoginScreens />
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
