import ReactDOM from "react-dom/client";
// import ProfileBar  from "./Profile/ProfileBar";
// import AllChats from "./AllChats/AllChats";
import Container from "./tb38r/Container";
import { LowerHeader, MainBody } from "./tb38r/Leftside";

const App = () => {
  return (
    <>
      <Container />
      <LowerHeader />
      <MainBody />
      {/* <ProfileBar/>
       <AllChats /> */}
    </>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
