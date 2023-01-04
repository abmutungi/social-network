import { useState } from "react";
import "./login.css";
import { Register } from "../Register/RegistrationComponent";
import { Link, Route, Routes } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <>
      <div className="login-logo">LOGO FOR THE SOCIAL NETWORK</div>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@email.com"
          ></input>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          ></input>

          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </Link>

          <Link
            to="/register"
            style={{ textDecoration: "none", color: "white" }}
          >
            <button className="login-register-button">Register</button>
          </Link>
          <Routes>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </form>
      </div>
    </>
  );
};

export { Login };
