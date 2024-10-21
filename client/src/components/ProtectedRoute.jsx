import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';
import useLocationCheck from '../hooks/useLocationCheck';

const ProtectedRoute = ({ children }) => {
  const [sessionVerified, setSessionVerified] = useState(null);
  const [locationVerified, setLocationVerified] = useState(null);
  const [deniedMessage, setDeniedMessage] = useState(null);
  const fetchedRef = useRef(false);

  const checkAuth = async (location) => {
    try {
      const response = await fetch('/api/check-auth', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: location }),
      });

      const error = await response.json();

      if (response.ok) {
        console.log("All checks passed:", error.message);
        setSessionVerified(true);
        setLocationVerified(true);
      } else {
        switch (error.type) {
          case 'AUTH_ERROR':
            console.log("Session auth failed:", error.message);
            setSessionVerified(false);
            break;
          case 'LOCATION_ERROR':
            console.log("Location auth failed:", error.message);
            setDeniedMessage(`You are in an unsupported location. Closest valid zone: ${error.closestZone}.`);
            setLocationVerified(false);
            break;
          case 'SERVER_ERROR':
            console.log("Server error:", error.message);
            setSessionVerified(false);
            setLocationVerified(false);
            break;
          default:
            console.log("An unknown error occured", error.message);
            setSessionVerified(false);
            setLocationVerified(false);
        }
        removeAuth();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setSessionVerified(false);
      setLocationVerified(false);
    }
  };

  const removeAuth = async () => {
    try {
      const response = await fetch('/api/remove-auth',
        {
          method: 'GET',
          credentials: 'include',
        });
      const error = await response.json();
      console.log(error.message);
    } catch (error){
      console.error('Error removing auth:', error);
    }
  }

  const checkLocation = useLocationCheck();
  useEffect(() => {
    const performChecks = async () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;

      try {
        // Get location
        const location = await checkLocation();
        await checkAuth(location);
      } catch (error) { // If get location fail
        removeAuth();
        console.error('Error:', error.message);
        setDeniedMessage("Enable location to be placed in a chatroom.");
        setLocationVerified(false);
      }
    };

    performChecks();
  }, [checkLocation]);

  if (sessionVerified === null && locationVerified === null) {
    return <Loading />
  }

  if (sessionVerified === false) {
    return <Navigate to="/" replace />;
  }

  if (locationVerified === false) {
    return <Navigate to="/access-denied" replace state={deniedMessage}/>;
  }

  if (sessionVerified && locationVerified) {
    return children;
  }

  return <Navigate to="/access-denied" replace />;
};

export default ProtectedRoute;