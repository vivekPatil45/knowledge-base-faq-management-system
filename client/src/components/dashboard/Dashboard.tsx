import React from "react";
import { Navbar } from "./Navbar";
import { AdminDashboard } from "./AdminDashboard";
import { EmployeeDashboard } from "./EmployeeDashboard";
import { useAuth } from "../../context/AuthContext";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="pt-24 px-4 sm:px-6">
        {user.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}
      </main>
    </div>
  );
};
