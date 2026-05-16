import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter } from "react-router-dom"
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}