import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context } from "..";
import "../styles/login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  if (isAuthenticated) return <Navigate to={"/"} />;

  const loginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.message === "Incorrect Password or Email")
        return (setIsAuthenticated(false), toast.error(data.message),setLoading(false));

      if (data.message === "Register First for Login")
        return (setIsAuthenticated(false), toast.error(data.message),setLoading(false));
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.respose.data.message);
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler}>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          <button disabled={loading} type="submit">Login</button>
          <h4>or</h4>
          <Link className="anchor2" to={"/register"}>
            Sign up
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
