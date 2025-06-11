import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ReviewPage from './pages/ReviewPage';
import LoginDialog from './components/LoginDialog';
import CMSDialog from './components/CMSDialog';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCMS, setShowCMS] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCMSClick = () => {
    if (isAuthenticated) {
      setShowCMS(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowCMS(true);
  };

  const handleLoginDialogClose = () => {
    setShowLogin(false);
  };

  const handleCMSDialogClose = () => {
    setShowCMS(false);
  };

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onLoginClick={handleLoginClick}
        onCMSClick={handleCMSClick}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/review/:id" element={<ReviewPage />} />
      </Routes>

      <Footer />

      <LoginDialog
        open={showLogin}
        onOpenChange={handleLoginDialogClose}
        onLoginSuccess={handleLoginSuccess}
      />

      <CMSDialog
        open={showCMS && isAuthenticated}
        onOpenChange={handleCMSDialogClose}
      />
    </div>
  );
}

export default App;