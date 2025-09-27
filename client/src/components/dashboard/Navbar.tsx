import React, { useState, useEffect } from "react";
import { Moon, Sun, LogOut, User, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps { }

export const Navbar: React.FC<NavbarProps> = () => {
    const { user, logout } = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Initialize dark mode from localStorage
    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(savedDarkMode);
        if (savedDarkMode) document.documentElement.classList.add("dark");
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", newDarkMode.toString());
        document.documentElement.classList.toggle("dark", newDarkMode);
    };

    const handleLogout = () => logout();

    if (!user) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 shadow-sm">
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
                {/* Logo & Title */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-lg">KB</span>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Knowledge Base</h1>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user.role} Dashboard</p>
                    </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-sm">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm">
                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[150px]">{user.email}</div>
                        </div>
                    </div>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow"
                        title={darkMode ? "Light Mode" : "Dark Mode"}
                    >
                        {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
                    </button>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700 dark:text-gray-300" /> : <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-4 shadow-lg">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{user.email}</div>
                        </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleDarkMode}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                            {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-400" />}
                            <span className="text-sm">{darkMode ? "Light" : "Dark"} Mode</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};
