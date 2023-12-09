import React from "react";
import {  Routes, Route } from "react-router-dom";
import ProductList from '../../../modules/product/clientViews/ProductList'
import OffersList from '../../../modules/offers/OffersList'
import OrdersScreens from "../../../modules/orders/OrdersScreens"
import ProductDashborad from "../../../modules/product/adminViews/ProductDashbBoard";
import HistoryScreens from "../../../modules/History/HistoryScreens";

const RouterEmploy = () => {
  return (
    <>
      <Routes>
      <Route path="orders" element={<OrdersScreens />} />
      <Route path="products" element={<ProductList />} />
      <Route path="offers" element={<OffersList />} />
      <Route path="productAdmin" element={<ProductDashborad />}/>
      <Route path="history" element={<HistoryScreens/>}/>
      </Routes>
    </>
  )
};

export default RouterEmploy;
