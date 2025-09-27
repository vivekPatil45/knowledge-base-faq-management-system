import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginRegister } from './components/auth/LoginRegister';
import { Dashboard } from './components/dashboard/Dashboard';
import { Toaster } from 'react-hot-toast';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth(); // ensure your context has a loading state

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4 "></div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginRegister />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
