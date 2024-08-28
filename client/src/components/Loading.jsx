import React, { useEffect, useState } from 'react';
import './styles/Loading.css';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateInterval = 15;
    const increment = 0.3; // Increment value to maintain speed

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + increment;
        if (newProgress > 100) {
          return 0; // Reset progress for continuous drawing effect
        }
        return newProgress;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='loading-container'>
      <img
        id="globe"
        src="/geoChatLogo.png"
        alt="Loading Globe"
        className='image'
        style={{
          clipPath: `circle(${progress}% at 50% 50%)`, // Dynamically apply clipPath
        }}
      />
      <p className='loading-text'>Loading...</p>
    </div>
  );
};

export default Loading;
