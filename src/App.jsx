import ReactDOM from "react-dom/client";
import TopHeader from "./Headers/TopHeader";
import { LowerHeader } from "./Headers/LowerHeader";
import { MainBody } from "./BodyComponents/BodyComps";

// import {ChatBox} from "./ChatBox/ChatBoxComponent"
import { Login } from "./Login/LoginComponent";
import { Register } from "./Register/RegistrationComponent";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";


/*
utils.ts:874 You rendered descendant <Routes> (or called `useRoutes()`) at "/" 
(under <Route path="/">) but the parent route path has no trailing "*". This means 
if you navigate deeper, the parent won't match anymore and therefore the child 
routes will never render.Please change the parent <Route path="/"> to <Route path="*">.

hanged "/" Route to "*" in (tb38r)
*/

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/notif" element={<NotificationsModal />}></Route> */}

        <Route
          path="*"
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
