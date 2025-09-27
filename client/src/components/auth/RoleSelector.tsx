import React from "react";
import { Users, Shield } from "lucide-react";

interface RoleSelectorProps {
  role: "admin" | "employee";
  onChange: (role: "admin" | "employee") => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ role, onChange }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Role
      </label>
      <div className="grid grid-cols-2 gap-3 dark:text-gray-300">
        <button
          type="button"
          onClick={() => onChange("employee")}
          className={`p-3 rounded-xl border transition-all duration-200 flex items-center gap-2 ${
            role === "employee"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-gray-400"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Employee</span>
        </button>
        <button
          type="button"
          onClick={() => onChange("admin")}
          className={`p-3 rounded-xl border transition-all duration-200 flex items-center gap-2 ${
            role === "admin"
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
              : "border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-gray-400"
          }`}
        >
          <Shield className="w-5 h-5" />
          <span className="font-medium">Admin</span>
        </button>
      </div>
    </div>
  );
};
