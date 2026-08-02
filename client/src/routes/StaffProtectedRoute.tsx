import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export const AdminProtectedRoute = () => {
    const user = useAuthStore((s) => s.user)

    if (!user) {
        return <Navigate to="/login" replace />
    }

    const allowedRoles = ["ADMIN", "MANAGER", "OWNER"]
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />   // normal user ko home bhej do
    }

    return <Outlet />
}