import ReactDOM from "react-dom/client";
import TopHeader from "./tb38r/TopHeader";
import { LowerHeader, MainBody } from "./tb38r/Leftside";
// import {ChatBox} from "./ChatBox/ChatBoxComponent"
import { Login } from "./Login/LoginComponent";
import { Register } from "./Register/RegistrationComponent";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <>
              <TopHeader />
              <LowerHeader />
              <MainBody />
            </>
          }
        ></Route>

        {/* <ChatBox/> */}
      </Routes>
    </>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
