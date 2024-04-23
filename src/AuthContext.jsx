// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from './config';
const AuthContext = createContext({
  authData:localStorage.getItem('authData') || {
    'status': null,
    'message': null,
    'user': null,
  },
  login: (email, password) => {login(email, password)}, // Modified login function
  logout: () => {logout()},
});

const AuthProvider = ({ value, children }) => {
  const [authData, setAuthData] = useState({
    'status': null,
    'message': null,
    'user': null,
  });
  const navigate = useNavigate(); // Initialize navigate
  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      setAuthData(JSON.parse(storedAuthData));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      setAuthData(data);
      
      // Update local storage
      if (data && data.user) {
        localStorage.setItem('authData', JSON.stringify(data));
      } else {
        localStorage.removeItem('authData');
      }      
      navigate('/'); // Navigate to home after successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  

  const logout = () => {
    setAuthData({
      'status': null,
      'message': null,
      'user': null,
    });
    localStorage.removeItem('authData');
    navigate('/login'); // Navigate to home after successful login
    
  };

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData));
    } else {
      localStorage.removeItem('authData');
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
