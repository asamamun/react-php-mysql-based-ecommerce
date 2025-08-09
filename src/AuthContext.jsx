// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from './config';
const AuthContext = createContext({
  authData: localStorage.getItem('authData') || {
    'status': null,
    'message': null,
    'user': null,
  },
  login: () => { }, // Modified login function
  logout: () => { },
});

const AuthProvider = ({ value, children }) => {
  // Initialize state with localStorage data if available
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        return JSON.parse(storedAuthData);
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        localStorage.removeItem('authData');
      }
    }
    return {
      'status': null,
      'message': null,
      'user': null,
    };
  });
  const navigate = useNavigate(); // Initialize navigate

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

  // Update localStorage whenever authData changes
  useEffect(() => {
    if (authData && authData.user) {
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
