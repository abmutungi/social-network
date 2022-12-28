import ReactDOM from "react-dom/client";
// import ProfileBar  from "./Profile/ProfileBar";
// import AllChats from "./AllChats/AllChats";
import TopHeader from "./tb38r/TopHeader";
import {  LowerHeader, MainBody } from "./tb38r/Leftside";
import "./index.css"


// import {ChatBox} from "./ChatBox/ChatBoxComponent"
// import {Login} from "./Login/LoginComponent"
// import {Register} from "./Register/RegistrationComponent"



const App = () => {
  return (
    <>
      <TopHeader />
      <LowerHeader />
      <MainBody />
      {/* <ProfileBar/>
       <AllChats /> */}
       {/* <ChatBox/>
       <Login/>
       <Register/> */}
    </>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
