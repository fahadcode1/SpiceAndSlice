import { useState } from "react";
import { useStaff } from "../../hooks/useStaff";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import "./AdminList.css";


export const AdminList = () => {
  const { user: currentUser } = useCurrentUser();
  const isOwner = currentUser?.role === "OWNER";

  const {
    users,
    isLoading,
    error,
    actionError,
    promoteAdmin,
    demoteAdmin,
    promoteManager,
    demoteManager,
  } = useStaff();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddAdmin = async () => {
    if (!newAdminEmail) return;
    setSubmitting(true);
    try {
      await promoteAdmin(newAdminEmail);
      setNewAdminEmail("");
      setShowAddForm(false);
    } catch {
      // actionError already set in hook
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemote = async (email: string, role: string) => {
    if (!window.confirm(`Demote ${email} to regular user?`)) return;
    if (role === "ADMIN") await demoteAdmin(email).catch(() => {});
    if (role === "MANAGER") await demoteManager(email).catch(() => {});
  };

  const handlePromoteToManager = async (email: string) => {
    await promoteManager(email).catch(() => {});
  };

  const staffUsers = (users ?? []).filter(
    (u) => u.role === "ADMIN" || u.role === "MANAGER"
  );

  return (
    <div className="admin-list-section">
      <div className="admin-list-header">
        <h2>Admin & Manager List</h2>
        <button className="btn-primary" onClick={() => setShowAddForm(true)}>
          + Add Admin
        </button>
      </div>

      {isLoading && <p>Loading users...</p>}
      {error && <p className="admin-list-error">{error}</p>}
      {actionError && <p className="admin-list-error">{actionError}</p>}

      {!isLoading && !error && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffUsers.map((staffUser) => (
                <tr key={staffUser._id}>
                  <td>{staffUser.firstName} {staffUser.lastName}</td>
                  <td>{staffUser.email}</td>
                  <td>{staffUser.mobileNumber}</td>
                  <td>
                    <span className={`role-badge role-${staffUser.role.toLowerCase()}`}>
                      {staffUser.role}
                    </span>
                  </td>
                  <td className="admin-actions">
                    {staffUser.role === "ADMIN" && (
                      <>
                        <button
                          className="btn-secondary"
                          onClick={() => handlePromoteToManager(staffUser.email)}
                        >
                          Make Manager
                        </button>

                        {isOwner && (
                          <button
                            className="btn-delete"
                            onClick={() => handleDemote(staffUser.email, staffUser.role)}
                          >
                            Demote
                          </button>
                        )}
                      </>
                    )}

                    {staffUser.role === "MANAGER" && isOwner && (
                      <button
                        className="btn-delete"
                        onClick={() => handleDemote(staffUser.email, staffUser.role)}
                      >
                        Demote
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {staffUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="admin-empty">
                    No admins or managers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAddForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Promote User to Admin</h3>
            <input
              type="email"
              placeholder="User's email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
            />
            {actionError && <p className="admin-list-error">{actionError}</p>}
            <div className="admin-modal-actions">
              <button className="btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddAdmin} disabled={submitting}>
                {submitting ? "Promoting..." : "Promote"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};