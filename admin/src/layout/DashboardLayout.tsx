import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import "./DashboardLayout.css";

export const DashboardLayout = () => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};