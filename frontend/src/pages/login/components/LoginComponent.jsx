import React from "react";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Register } from "../../register/components/RegistrationComponent";
import { Link, Route, Routes } from "react-router-dom";
import { loggedInUserContext } from "../../../context/loggedInUserContext";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { SocketContext } from "../../../context/webSocketContext";

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
  const { createSocket, updateNewNotifsExist } = useContext(SocketContext);
  const {
    updateAboutText,
    updateEmail,
    updateNickname,
    updateDOB,
    updateUserID,
    updateLoggedInUserID,
    updatePrivacyStatus,
    PrivacyStatus,
    updatePrivacyBtnText,
    updateDynamicID,
    updateProfilePhotoBackground,
  } = useContext(LowerHeaderContext);

  console.log("PS CHECK ON LOGIN --> ", PrivacyStatus);

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
        Avatar: data.User.Avatar,
        Notifications: data.User.Notifications,
        DOB: data.User.DOB,
        Nickname: data.User.Nickname,
      };
      console.log(currentUser);
      updateLoggedInUser(currentUser);
      updateUserID(currentUser.ID);
      updateAboutText(currentUser.AboutText);
      updateEmail(currentUser.Email);
      updateDOB(currentUser.DOB);
      updateNickname(currentUser.Nickname);
      updateLoggedInUserID(currentUser.ID);
      updatePrivacyStatus(currentUser.Privacy);
      updateNewNotifsExist(currentUser.Notifications);

      currentUser.Avatar != ""
        ? updateProfilePhotoBackground(currentUser.Avatar)
        : updateProfilePhotoBackground("userdefaulttwo.png");
      // updateDynamicID(currentUser.ID);
      if (PrivacyStatus) updatePrivacyBtnText(PrivateText);
      if (!PrivacyStatus) updatePrivacyBtnText(PublicText);

      // console.log(
      //   "CURRENT USER ID BEING PASSED TO UPDATE DYNAMIC =====>",
      //   currentUser.ID
      // );
      // updateDynamicID(currentUser.ID);
      console.log(loggedInUser);
      navigate("/home");
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
          navigate("/home");
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
          Avatar: data.User.Avatar,
          Notifications: data.User.Notifications,
          DOB: data.User.DOB,
          Nickname: data.User.Nickname,
        };
        console.log(currentUser);
        updateLoggedInUser(currentUser);
        updateUserID(currentUser.ID);
        updateAboutText(currentUser.AboutText);
        updateEmail(currentUser.Email);
        updateDOB(currentUser.DOB);
        updateNickname(currentUser.Nickname);
        updateLoggedInUserID(currentUser.ID);
        updatePrivacyStatus(currentUser.Privacy);
        updateNewNotifsExist(currentUser.Notifications);

        updateDynamicID(currentUser.ID);

        currentUser.Avatar != ""
          ? updateProfilePhotoBackground(currentUser.Avatar)
          : updateProfilePhotoBackground("userdefaulttwo.png");

        if (PrivacyStatus) updatePrivacyBtnText(PrivateText);
        if (!PrivacyStatus) updatePrivacyBtnText(PublicText);
        console.log("2ND PS CHECK ON LOGIN --> ", currentUser.Privacy);

        if (currentUser.Privacy) updatePrivacyBtnText(PrivateText);
        if (!currentUser.Privacy) updatePrivacyBtnText(PublicText);
        console.log("3RD PS CHECK ON LOGIN --> ", PrivacyStatus);
        console.log("4TH CHECK --> ", updatePrivacyStatus(currentUser.Privacy));
        createSocket(true);
        navigate("/home");
        // console.log("socket check => ", socket);
      }
    }

    sendLoginData();
  };

  return (
    <>
      <div className="login-container">
        <div className="login-logo">
          <div className="logo-text">
            <span>Connect</span>
          </div>
        </div>

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
          {loginErrorMessage && (
            <div className="loginErrorMsg">{loginErrorMessage}</div>
          )}
          <Routes>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </form>
      </div>
    </>
  );
};

export { Login };
