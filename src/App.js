import { useState } from "react";
import { Register } from "./RegistrationComponent";
import { Login } from "./LoginComponent";
import "./App.css";
import { ChatBox } from "./ChatBoxComponent";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div className="App">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
      <ChatBox></ChatBox>
    </div>
  );
}

export default App;
