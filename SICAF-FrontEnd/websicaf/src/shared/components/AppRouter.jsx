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
import UserEdt from '../../modules/users/components/UserEdt';
import ProductList from "../../modules/product/clientViews/ProductList";
import OffersList from "../../modules/offers/clientViews/OffersList";
import ErrorNotFound from './Error/ErrorNotFound';
import NewPassword from "../../modules/auth/generalViews/NewPassword";
import OffersDashborard from "./../../modules/offers/adminViews/OffersDashboard"

const AppRouter = () => {
  const { user } = useContext(AuthContext);
  const userRole = localStorage.getItem("userRole");
  let roleDefine = "";
    if (userRole != null) {
      const role = userRole || ""; // Asegúrate de que role no sea nulo
      roleDefine = role.replace(/^"(.*)"$/, "$1");
    }

  const renderUserRoleRouter = () => {
    switch (roleDefine) {
      case "Administrador":
        return (
          <>
            <Route path="users" element={<UsersScreens />} />
            <Route path="userform" element={<UserForm />} />
            <Route path="useredt/:datosCifrado" element={<UserEdt />} />
            <Route path="productAdmin" element={<ProductDashborad />} />
            <Route path="offersAdmin" element={<OffersDashborard />} />
          </>
        );
      case "Empleado":
        return (
          <>
            <Route path="products" element={<ProductList />} />
            <Route path="offers" element={<OffersList />} />
            <Route path="productAdmin" element={<ProductDashborad />} />
          </>
        );
      case "Cliente":
        return (
          <>
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
