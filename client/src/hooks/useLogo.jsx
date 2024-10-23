import { useState, useEffect } from 'react';

const getLogoForTheme = (theme) => {
  if (theme.includes('phosphor-P3')) return '/geoChatLogoP3.png';
  if (theme.includes('phosphor-P4')) return '/geoChatLogoP4.png';
  if (theme.includes('phosphor-P11')) return '/geoChatLogoP11.png';
  return '/geoChatLogoP1.png';
}

export const useLogo = () => {
  const [logoUrl, setLogoUrl] = useState(() => {
    const currentTheme = document.documentElement.className;
    return getLogoForTheme(currentTheme);
  });

  useEffect(() => {
    const updateLogo = () => {
      const currentTheme = document.documentElement.className;
      setLogoUrl(getLogoForTheme(currentTheme));
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