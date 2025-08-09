import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { authData } = useContext(AuthContext);

  // Check if user is authenticated
  if (!authData?.user) {
    return <Navigate to="/login" replace />;
  }

  // Check if specific role is required
  if (requiredRole !== null && authData.user.role !== requiredRole.toString()) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Access Denied</h4>
          <p>You don't have permission to access this page. Admin privileges required.</p>
          <hr />
          <p className="mb-0">Please contact an administrator if you believe this is an error.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;