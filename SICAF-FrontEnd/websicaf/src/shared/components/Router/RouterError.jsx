import React from 'react'
import { Routes, Route } from "react-router-dom";
import ErrorNotFound from '../Error/ErrorNotFound'

const RouterError = () => {
  return (
    <>
    <Routes>
    <Route path="*" element={<ErrorNotFound/>}/>
    </Routes>
    </>
  )
}

export default RouterError