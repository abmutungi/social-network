import ReactDOM from "react-dom/client";
import TopHeader from "./pages/home/components/TopHeader";
import { LowerHeader } from "./pages/home/components/LowerHeader";
import { MainBody } from "./pages/home/components/BodyComps";

// import {ChatBox} from "./ChatBox/ChatBoxComponent"
import { Login } from "./pages/login/components/LoginComponent";
import { Register } from "./pages/register/components/RegistrationComponent";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LowerHeaderProvider } from "./context/lowerheadercontext";
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
        <LowerHeaderProvider>
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
      </LowerHeaderProvider>
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
