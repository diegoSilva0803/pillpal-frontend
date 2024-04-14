import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import User from "./pages/User/User";
import SignIn from "./pages/SignIn/SignIn";
import MainLayout from "./components/MainLayout/MainLayout";
import AuthLayout from "./components/AuthLayout/AuthLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<User />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

