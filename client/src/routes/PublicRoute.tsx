import { Routes, Route } from "react-router-dom"
import Home from "../components/home/Home"
import Menu from "../components/menu/Menu"
import Cart from "../pages/Cart"
import About from "../pages/About"
import TermsOfService from "../pages/TermsOfService"
import PrivacyPolicy from "../pages/PrivicyPolicy"
import Contact from "../pages/Contact"
import { LoginPage } from "../components/auth/LoginPage"
import { RegisterPage } from "../components/auth/RegisterPage"
import { VerifyAccountPage } from "../components/auth/VerifyAccountPage"
import { RegisterSuccessPage } from "../components/auth/RegisterSuccessPage"
import { ForgotPasswordPage } from "../components/auth/ForgotPasswordPage"
import { ResetPasswordPage } from "../components/auth/ResetPasswordPage"
import { PasswordChangedPage } from "../components/auth/PasswordChangedPage"


export default function AppRoutes() {
    return(
    <Routes>
        <Route element={<Layout />}> 
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/password-changed" element={<PasswordChangedPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/TermsOfService" element={<TermsOfService />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/Contact" element={<Contact />} />
       </Route>
        <Route path="/verify-account" element={<VerifyAccountPage />} />
        <Route path="/register-success" element={<RegisterSuccessPage />} />
    </Routes>

)}


import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import Layout from "../components/layout/Layout"

export function PublicRoute() {
  const user = useAuthStore((s) => s.user)
  const isAuthReady = useAuthStore((s) => s.isAuthReady)

 
  if (!isAuthReady) return null
  
  if (user) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}