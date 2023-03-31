import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from ".";

function App() {
  const {isAuthenticated, setIsAuthenticated, user, setuser } = useContext(Context);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        setuser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setuser({});
        setIsAuthenticated(false);
      });
  }, [isAuthenticated]);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
