import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome. This is where your admin widgets/tables will go.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
