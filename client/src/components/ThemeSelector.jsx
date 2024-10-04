import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { IoColorPaletteOutline } from "react-icons/io5";

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
            className="p-2 text-2xl rounded-full hover:bg-primary hover:text-primary-darker focus:outline-none"
        >
            <IoColorPaletteOutline />
        </button>
    );
};

export default ThemeSelector;