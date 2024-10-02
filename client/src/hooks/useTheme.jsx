import { useState, useEffect } from 'react';

const themes = [
    { name: 'Phosphor P1', value: 'phosphor-P1' },
    { name: 'Phosphor P3', value: 'phosphor-P3' },
];

export const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme && themes.some(t => t.value === savedTheme)
        ? savedTheme
        : themes[0]?.value || '';

    document.documentElement.className = initialTheme;
    return initialTheme;
};

export const useTheme = () => {
    const [theme, setTheme] = useState(initializeTheme);

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    return { theme, setTheme, themes };
};