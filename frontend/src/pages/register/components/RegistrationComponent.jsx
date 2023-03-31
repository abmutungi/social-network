import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/register.css";
import { Login } from "../../login/components/LoginComponent";
import { Link, Route, Routes } from "react-router-dom";

const Register = () => {
  //State to hold errors
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState("");
  const navigate = useNavigate();

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
          navigate("/login");
        }, 3000);
      }
    }

    sendRegistrationData();
  };

  return (
    <>
      <div className="register-container">
      <div className="register-logo"><div className="logo-text">
    <span>Connect</span>
  </div></div>
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

          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
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