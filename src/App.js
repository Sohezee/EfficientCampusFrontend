import Root from "./components/Root";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Home from "./components/Home";


import './assets/styles/App.css';

import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Welcome />} /> 
      <Route path='login' element={<Login />} /> 
      <Route path='home' element={<Home />} /> 
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={ router } />
    </>
  );
}

export default App;
