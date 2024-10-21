import { useCallback } from 'react';

const useLocationCheck = () => {
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            });
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error("User denied the request for Geolocation."));
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error("Location information is unavailable."));
                break;
              case error.TIMEOUT:
                reject(new Error("The request to get user location timed out."));
                break;
              default:
                reject(new Error("An unknown error occurred."));
                break;
            }
          }
        );
      }
    });
  };

  const checkLocation = useCallback(async (forceCheck = false) => {
    const lastTime = sessionStorage.getItem("locationTime");
    const currentTime = new Date().getTime();

    if (!forceCheck && lastTime && currentTime - parseInt(lastTime, 10) <= 10 * 60 * 1000) {
      // if location was checked recently (within 10 minutes) and not forcing a check, use cached location
      const storedLocation = sessionStorage.getItem("location");
      if (storedLocation) {
        return JSON.parse(storedLocation);
      }
    }

    // If forcing a check, cache is expired, or no stored location, get new location
    const newLocation = await getUserLocation();

    // Update sessionStorage
    sessionStorage.setItem("location", JSON.stringify(newLocation));
    sessionStorage.setItem("locationTime", currentTime.toString());

    return newLocation;
  }, []);

  return checkLocation;
};

export default useLocationCheck;