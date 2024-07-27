import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { SkeletonLoader } from '../SekeltonLoading';

const ProtectedRoute = ({ children, role }) => {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    // Simulate a delay to mimic an auth check
    const checkAuth = async () => {
      // Simulate a delay for auth check (e.g., fetch user data)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div><SkeletonLoader /></div>;
  }

  // Check if the user is authenticated
  if (!auth?.user) {
    return <Navigate to="/auth/login" />;
  }

  // Check if the user has the required role
  if (role && !auth.user.role.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // User is authenticated and has the required role
  return children;
};

export default ProtectedRoute;
