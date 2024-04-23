// useAuth.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
const ProviderWrapper = ({ children }) => {
  
  const navigate = useNavigate();
  const { authData, login, logout } = useContext(AuthContext);
  // console.log(JSON.parse(authData));

  const authProviderValue = {
    authData,
    login,
    logout,
    navigate,
  };
  // console.log(authProviderValue);

  return <AuthProvider value={authProviderValue}>{children}</AuthProvider>;
};
const AuthWrapper = ({ children }) => {
    return (
      <Router>
        <ProviderWrapper>{children}</ProviderWrapper>
      </Router>
    );
  };

const useAuth = () => {
  const { login, logout, authData, navigate } = useContext(AuthContext);
  return { login, logout, authData, navigate };
};

export { AuthWrapper, useAuth };