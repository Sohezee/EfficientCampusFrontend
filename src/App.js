import Root from "./components/Root";
import Welcome from "./components/Welcome";


import './assets/styles/App.css';

import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Welcome />} /> 
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
