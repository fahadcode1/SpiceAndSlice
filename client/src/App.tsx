import { AppRoutes } from "./routes/AppRoutes"
import { AuthProvider } from "./context/AuthContext"
import { useAuthStore } from "./store/authStore"
import { useEffect, useRef } from "react"
import './App.css'

function App() {
  const initialize = useAuthStore(state => state.initialize)
  const isAuthReady = useAuthStore(state => state.isAuthReady)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    initialize()
  }, [])

  if (!isAuthReady) return null

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App