import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoutes"
import { PublicRoute } from "./PublicRoute"
import { MyOrdersPage } from "../components/myOrders/ordersPage"
// Layouts
import Layout from "../components/layout/Layout"

// Landing
import Home from "../components/home/Home"
import Menu from "../components/menu/Menu"
import Cart from "../pages/Cart"
import About from "../pages/About"
import TermsOfService from "../pages/TermsOfService"
import PrivacyPolicy from "../pages/PrivicyPolicy"
import Contact from "../pages/Contact"

// Auth pages
import { LoginPage } from "../components/auth/LoginPage"
import { RegisterPage } from "../components/auth/RegisterPage"
import { VerifyAccountPage } from "../components/auth/VerifyAccountPage"
import { RegisterSuccessPage } from "../components/auth/RegisterSuccessPage"
import { ForgotPasswordPage } from "../components/auth/ForgotPasswordPage"
import { ResetPasswordPage } from "../components/auth/ResetPasswordPage"
import { PasswordChangedPage } from "../components/auth/PasswordChangedPage"

// Dashboard / account pages
import { DashboardPage } from "../components/userSettings/Dashboard"
import { EditNamePage } from "../components/userSettings/accountSettingPage/EditNamePage"
import { ChangePassword } from "../components/userSettings/accountSettingPage/ChangePasswordForm"
import { UpdateMobileNumber } from "../components/userSettings/accountSettingPage/UpdateMobileForm"
import { UpdateEmail } from "../components/userSettings/accountSettingPage/UpdateEmailForm"
import { DeleteAccount } from "../components/userSettings/accountSettingPage/DeleteAccount"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
               
                <Route path="/" element={<Home />} />

                {/* General public pages */}
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/contact" element={<Contact />} />

                
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/password-changed" element={<PasswordChangedPage />} />
                </Route>

                <Route path="/verify-account" element={<VerifyAccountPage />} />
                <Route path="/register-success" element={<RegisterSuccessPage />} />

                {/* Only for logged-in users — same Layout, flat for now */}
                <Route element={<ProtectedRoute />}>
                {/* User Account settings */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/account/change-password" element={<ChangePassword />} />
                    <Route path="/account/edit-name" element={<EditNamePage />} />
                    <Route path="/account/edit-mobile" element={<UpdateMobileNumber />} />
                    <Route path="/account/edit-email" element={<UpdateEmail />} />
                    <Route path="/account/delete-account" element={<DeleteAccount />} />

                    <Route path="/account/my-orders" element={<MyOrdersPage/>} />
                </Route>
            </Route>
        </Routes>
    )
}