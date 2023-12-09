import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDashborad from "../../../modules/product/adminViews/ProductDashbBoard";
import UsersScreens from "../../../modules/users/UsersScreens";
import UserForm from "../../../modules/users/components/UserForm";
import HistoryScreens from "../../../modules/History/HistoryScreens";
import UserEdt from './../../../modules/users/components/UserEdt';

const RouterGerent = () => {
  return (
    <Routes>
      <Route path="users" element={<UsersScreens />} />
      <Route path="userform" element={<UserForm />} />
      <Route path="useredt" element={<UserEdt />} />
      <Route path="productAdmin" element={<ProductDashborad />} />
      <Route path="history" element={<HistoryScreens />} />
    </Routes>
  );
};

export default RouterGerent;

