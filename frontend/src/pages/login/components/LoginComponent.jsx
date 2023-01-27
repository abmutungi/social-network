import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Register } from "../../register/components/RegistrationComponent";
import { Link, Route, Routes } from "react-router-dom";
import "../../../assets/css/login.css";

let currentUser = {
  ID: "",
  Email: "",
  FName: "",
  LName: "",
};

const Login = () => {
  async function loginCheck() {
    console.log("CURRENT USER CHECK -> ", currentUser);
    const response = await fetch("http://localhost:8080/frontendlogin", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(currentUser),

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    console.log("Data check -> ", data);
    if (!data.success) {
      (currentUser.ID = data.ID),
        (currentUser.Email = data.Email),
        (currentUser.FName = data.FName),
        (currentUser.LName = data.LName),
        navigate("/");
    } else {
      return;
    }
  }
  loginCheck();

  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loginFormValues, setLoginFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginErrorMessage("");
    const { name, value } = event.target;
    setLoginFormValues({
      ...loginFormValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function sendLoginData() {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginFormValues),

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log("Data check -> ", data);

      if (data.error && data.loginMsg === "User is already logged in") {
        setLoginErrorMessage(data.loginMsg);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (data.error) {
        setLoginErrorMessage(data.loginMsg);
      } else {
        (currentUser.ID = data.User.UserID),
          (currentUser.Email = data.User.Email),
          (currentUser.FName = data.User.Firstname),
          (currentUser.LName = data.User.Lastname),
          console.log(currentUser);
        navigate("/");
      }
    }

    sendLoginData();
  };

  return (
    <>
      <div className="login-logo">LOGO FOR THE SOCIAL NETWORK</div>
      {loginErrorMessage && (
        <div className="loginErrorMsg">{loginErrorMessage}</div>
      )}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <input
            required
            name="email"
            value={loginFormValues.email}
            onChange={handleChange}
            type="email"
            placeholder="email@email.com"
          ></input>

          <input
            required
            name="password"
            value={loginFormValues.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          ></input>

          {/* <Link to="/" style={{ textDecoration: "none", color: "white" }}> */}
          <button type="submit" className="login-button">
            LOGIN
          </button>
          {/* </Link> */}

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

export { Login, currentUser };
