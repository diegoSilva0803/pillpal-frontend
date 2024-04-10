import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import User from "./pages/User/User";

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/medication/create" element={<User />}/>  
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
