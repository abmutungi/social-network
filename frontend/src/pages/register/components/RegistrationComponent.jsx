import React from "react";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/register.css";
import { Login } from "../../login/components/LoginComponent";
import { Link, Route, Routes } from "react-router-dom";
import { SocketContext } from "../../../context/webSocketContext";
import { loggedInUserContext } from "../../../context/loggedInUserContext";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { PublicText, PrivateText } from "../../home/components/PrivateBtn";


const Register = () => {
  const navigate = useNavigate();

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

  async function loginRCheck() {
    console.log("cookie check => ", document.cookie);
    console.log(
      "cookie id check => ",
      document.cookie.slice(document.cookie.indexOf("=") + 1)
    );

    let userCookie = {
      CookieID: document.cookie.slice(document.cookie.indexOf("=") + 1),
    };
    console.log("CURRENT USER CHECK -> ", loggedInUser);
    const response = await fetch("http://localhost:8080/frontendreg", {
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
  if (document.cookie !== "") loginRCheck();
  
  //State to hold errors
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState("");

  // State to store form values
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nickname: "",
    aboutMe: "",
  });

  const handleChange = (event) => {
    setErrorMessage("");
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const hiddenFileInput = useRef(null);

  const handleFileClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const registrationFormData = new FormData(event.target);
    registrationFormData.append("imgName", imgName);

    console.log(registrationFormData);
    //console.log(formValues);
    //JSON.stringify(formValues)
    async function sendRegistrationData() {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: registrationFormData,
        credentials: "include",
      });

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.regMsg);
      } else {
        setSuccessMessage(
          "You have successfully registered and are now being redirected to the log in page!"
        );
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    }

    sendRegistrationData();
  };

  return (
    <>
      <div className="register-container">
        <div className="register-logo">
          <div className="logo-text">
            <span>Connect</span>
          </div>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            required
            placeholder="First Name"
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
          />

          <input
            required
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />

          <input
            required
            placeholder="email@email.com"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />

          <input
            required
            placeholder="Password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />

          <input
            required
            type="date"
            name="dateOfBirth"
            value={formValues.dateOfBirth}
            onChange={handleChange}
          />

          <input
            placeholder="Nickname (Optional)"
            type="text"
            name="nickname"
            value={formValues.nickname}
            onChange={handleChange}
          />

          <textarea
            placeholder="About Me (Optional)"
            name="aboutMe"
            value={formValues.aboutMe}
            onChange={handleChange}
          />

          <button
            onClick={handleFileClick}
            className="avatar-upload-btn"
            htmlFor="avatar"
          >
            Upload An Avatar (Optional)
          </button>

          <input
            type="file"
            ref={hiddenFileInput}
            name="avatar"
            value={formValues.avatar}
            onChange={(e) => {
              setImg(e.target.files[0]);
              setImgName(e.target.files[0].name);
            }}
            style={{ display: "none" }}
          />

          <button className="register-button" type="submit">
            Create Account
          </button>

          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <button className="register-login-button" type="submit">
              Already have an account? Click here to log in
            </button>
          </Link>
          {errorMessage && <div className="errorMsg">{errorMessage}</div>}
          {successMessage && <div className="successMsg">{successMessage}</div>}
          <Routes>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </form>
      </div>
    </>
  );
};

export { Register };
