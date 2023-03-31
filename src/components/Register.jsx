import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.scss";
import axios from "axios";
import { Context } from "..";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const Navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  if (isAuthenticated) return <Navigate to={"/"} />;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        {
          name,
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
      setLoading(false);
      if (data.message === "Already Registered") {
        return (setIsAuthenticated(false), toast.error(data.message));
      }
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.respose.data.message);
      console.log(error);
      setIsAuthenticated(false);
    }
  };
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            placeholder="Name"
          />
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
          <button disabled={loading} type="submit">Sign up</button>
          <h4>or</h4>
          <Link className="anchor" to={"/Login"}>
            Login
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
