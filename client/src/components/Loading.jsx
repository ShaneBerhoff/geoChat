import React, { useEffect, useState } from 'react';
import { useLogo } from '../hooks/useLogo';
import MainLayout from './ui/mainLayout';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const logoUrl = useLogo();

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
    <MainLayout>
      <div className="flex flex-col items-center justify-center border-2 border-primary-dark h-full w-full bg-primary-darker">
        <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] overflow-hidden">
          <img
            src={logoUrl}
            alt="Loading Globe"
            className="w-full h-full object-cover"
            style={{
              clipPath: `circle(${progress}% at 50% 50%)`,
            }}
          />
        </div>
        <p className="mt-20 text-3xl sm:text-4xl text-primary">Verifying Location</p>
      </div>
    </MainLayout>
  );
};

export default Loading;