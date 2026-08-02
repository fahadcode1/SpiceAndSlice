import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "../layout/Layout"
import { LoginPage } from "../pages/Login"
import { PublicRoute } from "./PublicRoute"
import { ProtectedRoute } from "./ProtectedRoute"
import { DashboardLayout } from "../layout/DashboardLayout"
import { DishesSection } from "../components/sections/DishesSection"
import { AdminList } from "../components/sections/AdminList"
import { StaffDashboardPage } from "../pages/StaffDashboard"

export const AuthRoutes = () => {
    return (
        <Routes>

        
            <Route element={<Layout />}>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="dishes" replace />} />
                    <Route path="dishes" element={<DishesSection />} />
                    <Route path="admins" element={<AdminList />} />
                    <Route path="profile" element={<StaffDashboardPage />} />
                </Route>
            </Route>

        </Routes>
    )
}