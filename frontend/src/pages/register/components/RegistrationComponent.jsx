import React from "react";
import "../../../assets/css/register.css";
import { Login } from "../../login/components/LoginComponent";
import { Link, Route, Routes } from "react-router-dom";

const Register = () => {
  // State to store form values
  const [formValues, setFormValues] = React.useState({
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
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
   
   fetch("http://localhost:8080/register", {
     method: "POST",
     mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
         
      },
        body: JSON.stringify(formValues),
    })
  };
  

  return (
    <>
      <div className="login-logo">LOGO FOR THE SOCIAL NETWORK</div>
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
