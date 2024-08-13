import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;
      
      try {
        const response = await fetch('/api/check-auth', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          console.log("Authenticated");
          setIsAuthenticated(true);
        } else {
          console.log("Not Authenticated");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;