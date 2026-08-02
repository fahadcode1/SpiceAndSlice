import { Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout = () => {
  return (
    <div className="layout-wrapper">
      <header className="layout-header">
        <div className="layout-header-inner">
          <h1 className="layout-brand">Spice & Slice</h1>
        </div>
      </header>

      <main className="layout-content">
        <div className="layout-content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};