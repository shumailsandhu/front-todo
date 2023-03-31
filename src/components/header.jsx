import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context } from "..";
import "../styles/header.scss";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const logoutHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/users/logout",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      // toast.error(error.respose.data.message);
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article className="article">
        <Link to={"/"}>
          {" "}
          <button disabled={loading}>Home</button>
        </Link>
        <Link to={"/profile"}>
          <button disabled={loading}>Profile</button>
        </Link>

        {isAuthenticated ? (
          <Link>
            <button
              className="Butoon-log"
              disabled={loading}
              onClick={logoutHandler}
            >
              logout
            </button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button className="Butoon-log" disabled={loading}>
              login
            </button>
          </Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
