import Root from "./components/Root";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Home from "./components/Home";
import { UserProvider } from './components/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

import './assets/styles/App.css';

import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Welcome />} />
      <Route path="login" element={<Login />} />
      <Route
        path="home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={ router } />
    </UserProvider>
  );
}

export default App;
