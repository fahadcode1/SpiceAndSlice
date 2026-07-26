import { Routes, Route } from "react-router-dom"

// Layouts
import Layout from "../components/layout/Layout"

// Route guards
// import { ProtectedRoute } from "./ProtectedRoutes"
// import { PublicRoute } from "./PublicRoute"

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
// import { DashboardPage } from "../components/dashboard/DashboardPage"
// import { EditNamePage } from "../components/accountSettingsPage/EditNamePage"
// import { ChangePassword } from "../components/accountSettingsPage/ChangePasswordForm"
// import { UpdateMobileNumber } from "../components/accountSettingsPage/UpdateMobileForm"
// import { UpdateEmail } from "../components/accountSettingsPage/UpdateEmailForm"
// import { DeleteAccount } from "../components/accountSettingsPage/DeleteAccount"

export const AppRoutes = () => {
    return (
        <Routes>
         <Route path="/" element={<Home />} /> 
    <Route element={<Layout />}>
    {/* General public pages — sabke liye open, koi guard nahi chahiye */}
    <Route path="/menu" element={<Menu />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/about" element={<About />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/contact" element={<Contact />} />

   
    
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/password-changed" element={<PasswordChangedPage />} />
    </Route>

    <Route path="/verify-account" element={<VerifyAccountPage />} />
    <Route path="/register-success" element={<RegisterSuccessPage />} />


            {/* Protected dashboard / account routes (flat for now, nesting later) */}
            {/* <Route element={<ProtectedRoute />}>
                <Route
                    path="/dashboard"
                    element={
                        <DashboardLayout>
                            <DashboardPage />
                        </DashboardLayout>
                    }
                />
                <Route
                    path="/account/edit-name"
                    element={
                        <DashboardLayout>
                            <EditNamePage />
                        </DashboardLayout>
                    }
                />
                <Route
                    path="/account/change-password"
                    element={
                        <DashboardLayout>
                            <ChangePassword />
                        </DashboardLayout>
                    }
                />
                <Route
                    path="/account/edit-mobile"
                    element={
                        <DashboardLayout>
                            <UpdateMobileNumber />
                        </DashboardLayout>
                    }
                />
                <Route
                    path="/account/edit-email"
                    element={
                        <DashboardLayout>
                            <UpdateEmail />
                        </DashboardLayout>
                    }
                />
                <Route
                    path="/account/delete-account"
                    element={
                        <DashboardLayout>
                            <DeleteAccount />
                        </DashboardLayout>
                    }
                />
            </Route> */}
        </Routes>
    )
}