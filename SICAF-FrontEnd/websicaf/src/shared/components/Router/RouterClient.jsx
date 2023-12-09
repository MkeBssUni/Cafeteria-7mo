import React from "react";
import {  Routes, Route } from "react-router-dom";
import ProductList from '../../../modules/product/clientViews/ProductList';
import OffersList from '../../../modules/offers/OffersList'
import OrdersScreens from "../../../modules/orders/OrdersScreens";

const RouterClient = () => {
  return (
    <>
      <Routes>
      <Route path="orders" element={<OrdersScreens />} />
      <Route path="products" element={<ProductList />} />
      <Route path="offers" element={<OffersList />} />
      </Routes>
    </>
  );
};

export default RouterClient;
