
import { Routes, Route } from "react-router-dom"
import Home from "../components/home/Home"
import NavBarLayout from "../components/layout/NavBarLayout"
import Menu from "../components/menu/Menu"
import Cart from "../pages/Cart"
import LoginPage from "../components/home/LoginPage"
import About from "../pages/About"
import TermsOfService from "../pages/TermsOfService"
import PrivacyPolicy from "../pages/PrivicyPolicy"
import Contact from "../pages/Contact"

export default function AppRoutes() {
    return(
    <Routes>
        <Route element={<NavBarLayout />}> 
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/TermsOfService" element={<TermsOfService />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/Contact" element={<Contact />} />
       </Route>
        
    </Routes>

)}