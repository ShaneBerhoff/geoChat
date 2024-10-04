import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateInterval = 8;
    const increment = 0.5;

    const animate = () => {
      setProgress((prevProgress) => (prevProgress + increment) % 100);
    };

    const intervalId = setInterval(animate, updateInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-primary-darker">
      <div className="w-[350px] h-[350px] overflow-hidden">
        <img
          src="/geoChatLogo.png"
          alt="Loading Globe"
          className="w-full h-full object-cover"
          style={{
            clipPath: `circle(${progress}% at 50% 50%)`,
          }}
        />
      </div>
      <p className="mt-5  text-primary">Loading...</p>
    </div>
  );
};

export default Loading;