import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/register.css";
import { Login } from "../../login/components/LoginComponent";
import { Link, Route, Routes } from "react-router-dom";

const Register = () => {
  //State to hold errors
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // State to store form values
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    avatar: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formValues);

    async function sendRegistrationData() {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: JSON.stringify(formValues),
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

  const printData = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="login-logo">LOGO FOR THE SOCIAL NETWORK</div>
      {errorMessage && <div className="errorMsg">{errorMessage}</div>}
      {successMessage && <div className="successMsg">{successMessage}</div>}
      <div className="register-container">
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

          <label htmlFor="avatar">
            Choose an image to be your avatar (Optional)
          </label>
          <input
            type="file"
            name="avatar"
            value={formValues.avatar}
            onChange={handleChange}
          />

          <button className="register-button" type="submit">
            Create Account
          </button>

          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <button className="register-login-button" type="submit">
              Already have an account? Click here to log in
            </button>
          </Link>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </form>
      </div>
    </>
  );
};

export { Register };
