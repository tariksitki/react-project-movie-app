import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AppNavbar from "../components/navbar/AppNavbar";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Register from "../pages/Register";


const AppRouter = () => {
  return (
    <Router>
        <AppNavbar />
        <Routes>
            <Route path="/" element = {<Main />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/register" element = {<Register />} />
        </Routes>
    </Router>
  )
}

export default AppRouter;