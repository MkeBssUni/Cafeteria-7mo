import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreens from "../../modules/auth/generalViews/LoginScreens";
import RecoryPassword from "../../modules/auth/generalViews/RecoryPassword";
import Navbarsicaf from "./Navbar";
import Welcome from "./Welcome";
import { AuthContext } from "../../modules/auth/authContext";
import ProductDashborad from "../../modules/product/adminViews/ProductDashbBoard";
import UsersScreens from "../../modules/users/UsersScreens";
import UserForm from "../../modules/users/components/UserForm";
import HistoryScreens from "../../modules/History/HistoryScreens";
import UserEdt from '../../modules/users/components/UserEdt';
import ProductList from "../../modules/product/clientViews/ProductList";
import OffersList from "../../modules/offers/OffersList";
import OrdersScreens from "../../modules/orders/OrdersScreens";
import ErrorNotFound from './Error/ErrorNotFound';
import NewPassword from "../../modules/auth/generalViews/NewPassword";
import OffersDashborard from "./../../modules/offers/adminViews/OffersDashboard"

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const userRole = localStorage.getItem("userRole");
  const renderUserRoleRouter = (userRole) => {
    switch (userRole) {
      case "Administrador":
        return (
          <>
            <Route path="users" element={<UsersScreens />} />
            <Route path="userform" element={<UserForm />} />
            <Route path="useredt" element={<UserEdt />} />
            <Route path="productAdmin" element={<ProductDashborad />} />
            <Route path="history" element={<HistoryScreens />} />
            <Route path="offersAdmin" element={<OffersDashborard />} />
          </>
        );
      case "Empleado":
        return (
          <>
            <Route path="orders" element={<OrdersScreens />} />
            <Route path="products" element={<ProductList />} />
            <Route path="offers" element={<OffersList />} />
            <Route path="productAdmin" element={<ProductDashborad />} />
            <Route path="history" element={<HistoryScreens />} />
          </>
        );
      case "Cliente":
        return (
          <>
            <Route path="orders" element={<OrdersScreens />} />
            <Route path="products" element={<ProductList />} />
            <Route path="offers" element={<OffersList />} />
          </>
        );
      default:
        <>
        <Route path="notFound" element={<ErrorNotFound/>}/>
        </>
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreens />} />
        <Route path="/recoveryPassword" element={<RecoryPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route
          path="/*"
          element={
            user.isLogged ? (
              <>
                <Navbarsicaf />
                <Routes>
                  <Route path="/welcome" element={<Welcome />} />
                  {renderUserRoleRouter(userRole)}
                  <Route path="*" element={<ErrorNotFound />} />
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
