import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import ProfilePage from './pages/ProfilePage';
// import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Header />
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:templateId"
            element={
              <ProtectedRoute>
                <Header />
                <EditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Header />
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
