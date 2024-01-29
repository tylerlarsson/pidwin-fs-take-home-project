import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import PasswordSetting from "./components/PasswordSettings/PasswordSettings";
import { loadUser } from "./actions/login";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Login />} />
          <Route exact path="/password" element={<PasswordSetting />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
