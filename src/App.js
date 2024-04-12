import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import User from "./pages/User/User";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  

  return (
    <>
    <BrowserRouter>
    <NavBar />   
    <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/user" element={<User />}/>  
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
