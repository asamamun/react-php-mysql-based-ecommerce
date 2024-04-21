// AuthContext.jsx
import React, { createContext, useState , useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    'status': null,
    'message': null,
    'user': null,
});
useEffect(() => {
  const storedAuthData = localStorage.getItem('authData');
  if (storedAuthData) {
    setAuthData(JSON.parse(storedAuthData));
  }
}, []);

useEffect(() => {
  if (authData) {
    localStorage.setItem('authData', JSON.stringify(authData));
  } else {
    localStorage.removeItem('authData');
  }
}, [authData]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost/ROUND57/reactJS/react-php-mysql-based-ecommerce/API/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setAuthData(data);
      console.log(data)
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authData, login }}>
      {children}
    </AuthContext.Provider>
  );
};