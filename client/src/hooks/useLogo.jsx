import { useState, useEffect } from 'react';

export const useLogo = () => {
  const [logoUrl, setLogoUrl] = useState(() => {
    // Initialize with current theme
    const currentTheme = document.documentElement.className;
    if (currentTheme.includes('phosphor-P3')) return '/geoChatLogoP3.png';
    return '/geoChatLogoP1.png';
  });

  useEffect(() => {
    const updateLogo = () => {
      const currentTheme = document.documentElement.className;
      if (currentTheme.includes('phosphor-P3')) {
        setLogoUrl('/geoChatLogoP3.png');
      } else {
        setLogoUrl('/geoChatLogoP1.png');
      }
    };

    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return logoUrl;
};