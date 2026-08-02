import { useState, useEffect, useCallback } from "react";
import { api } from "../api/axios";

export type Role = "USER" | "ADMIN" | "MANAGER" | "OWNER";

export interface StaffUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  role: Role;
}

export const useStaff = () => {
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");


  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.get("/admin/staffs");
      setUsers(data.staff);
    } catch {
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyRoleUpdate = (email: string, role: Role) => {
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, role } : u))
    );
  };

  const promoteAdmin = async (email: string) => {
    setActionError("");
    try {
      await api.patch("/admin/staffs/promote-admin", { email });
      applyRoleUpdate(email, "ADMIN");
    } catch (err: any) {
      setActionError(err?.response?.data?.message || "Failed to promote to admin");
      throw err;
    }
  };

  const demoteAdmin = async (email: string) => {
    setActionError("");
    try {
      await api.patch("/admin/staffs/demote-admin", { email });
      applyRoleUpdate(email, "USER");
    } catch (err: any) {
      setActionError(err?.response?.data?.message || "Failed to demote admin");
      throw err;
    }
  };

  const promoteManager = async (email: string) => {
    setActionError("");
    try {
      await api.patch("/admin/staffs/promote-manager", { email });
      applyRoleUpdate(email, "MANAGER");
    } catch (err: any) {
      setActionError(err?.response?.data?.message || "Failed to promote to manager");
      throw err;
    }
  };

  const demoteManager = async (email: string) => {
    setActionError("");
    try {
      await api.patch("/admin/staffs/demote-manager", { email });
      applyRoleUpdate(email, "USER");
    } catch (err: any) {
      setActionError(err?.response?.data?.message || "Failed to demote manager");
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    actionError,
    fetchUsers,
    promoteAdmin,
    demoteAdmin,
    promoteManager,
    demoteManager,
  };
};