import { useState } from "react";
import "./login.css";

const Login = (props) => {
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

          <button type="submit" className="login-button">
            LOG IN
          </button>

          <button
            onClick={() => props.onFormSwitch("register")}
            className="login-register-button"
          >
            REGISTER
          </button>
        </form>
      </div>
    </>
  );
};

export { Login };
