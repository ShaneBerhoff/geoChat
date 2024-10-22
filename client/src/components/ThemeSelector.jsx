import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeSelector = () => {
    const { theme, setTheme, themes } = useTheme();

    const cycleTheme = () => {
        const currentIndex = themes.findIndex(t => t.value === theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex].value);
    };

    return (
        <button
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-primary-dark hover:text-primary focus:outline-none w-10 h-10 transition-all duration-300 ease-in-out"
            aria-label='Theme'
        >
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"> 
                <title>Theme</title>
                <path d="M9 2h2v2H9V2zm4 4V4h-2v2H9v2H7v2H5v2H3v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v6h2V12h-2v-2h-2V8h-2V6h-2zm0 0v2h2v2h2v2h2v2H5v-2h2v-2h2V8h2V6h2z" fill="currentColor"/> 
            </svg>
        </button>
    );
};

export default ThemeSelector;