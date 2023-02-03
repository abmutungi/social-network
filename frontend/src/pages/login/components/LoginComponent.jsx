import React from "react";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Register } from "../../register/components/RegistrationComponent";
import { Link, Route, Routes } from "react-router-dom";
import { loggedInUserContext } from "../../../context/loggedInUserContext";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { PublicText, PrivateText } from "../../home/components/PrivateBtn";
import "../../../assets/css/login.css";

// let currentUser = {
//   ID: "",
//   Email: "",
//   FName: "",
//   LName: "",
// };

const Login = () => {
  const { loggedInUser, updateLoggedInUser } = useContext(loggedInUserContext);
  const {
    updateAboutText,
    updateUserID,
    updateLoggedInUserID,
    updatePrivacyStatus,
    PrivacyStatus,
    updatePrivacyBtnText,
    updateDynamicID,
  } = useContext(LowerHeaderContext);

  async function loginCheck() {
    console.log("cookie check => ", document.cookie);
    console.log(
      "cookie id check => ",
      document.cookie.slice(document.cookie.indexOf("=") + 1)
    );

    let userCookie = {
      CookieID: document.cookie.slice(document.cookie.indexOf("=") + 1),
    };
    console.log("CURRENT USER CHECK -> ", loggedInUser);
    const response = await fetch("http://localhost:8080/frontendlogin", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(userCookie),

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    console.log("Data check -> ", data);
    if (!data.success) {
      const currentUser = {
        ID: data.User.UserID,
        Email: data.User.Email,
        FName: data.User.Firstname,
        LName: data.User.Lastname,
        AboutText: data.User.AboutText,
        Privacy: data.User.Privacy,
      };
      console.log(currentUser);
      updateLoggedInUser(currentUser);
      updateAboutText(currentUser.AboutText);
      updateUserID(currentUser.ID);
      updateLoggedInUserID(currentUser.ID);
      updatePrivacyStatus(currentUser.Privacy);
      updateDynamicID(currentUser.ID);
      if (PrivacyStatus) updatePrivacyBtnText(PrivateText);
      if (!PrivacyStatus) updatePrivacyBtnText(PublicText);

      console.log(loggedInUser);
      navigate("/");
    } else {
      return;
    }
  }
  if (document.cookie !== "") loginCheck();

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
        const currentUser = {
          ID: data.User.UserID,
          Email: data.User.Email,
          FName: data.User.Firstname,
          LName: data.User.Lastname,
          AboutText: data.User.AboutText,
          Privacy: data.User.Privacy,
        };
        console.log(currentUser);
        updateLoggedInUser(currentUser);
        updateAboutText(currentUser.AboutText);
        updateUserID(currentUser.ID);
        updateLoggedInUserID(currentUser.ID);
        updatePrivacyStatus(currentUser.Privacy);
        if (PrivacyStatus) updatePrivacyBtnText(PrivateText);
        if (!PrivacyStatus) updatePrivacyBtnText(PublicText);
        // console.log(loggedInUser);
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

export { Login };
