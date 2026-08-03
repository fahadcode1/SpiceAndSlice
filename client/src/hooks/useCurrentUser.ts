import { useEffect, useState } from "react";
import { getMe, type CurrentUser } from "../services/authService";

export const useCurrentUser = () => {
    const [user, setUser] = useState<CurrentUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUser() {
            try {
                const result = await getMe()
                setUser(result.user)
            } catch (err: any) {
                if (err?.response?.status === 401) {
                   
                    setUser(null)
                } else {
                    setError(err?.response?.data?.message || "Failed to load user")
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchUser()
    }, [])

    return { user, isLoading, error }
}