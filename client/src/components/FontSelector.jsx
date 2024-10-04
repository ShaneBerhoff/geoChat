import React from 'react';
import { useFont } from '../hooks/useFont';
import { BiFontFamily } from "react-icons/bi";

const FontSelector = () => {
    const { font, setFont, fonts } = useFont();

    const cycleFont = () => {
        const currentIndex = fonts.findIndex(f => f.value === font);
        const nextIndex = (currentIndex + 1) % fonts.length;
        setFont(fonts[nextIndex].value);
    };

    return (
        <button
            onClick={cycleFont}
            className="p-2 text-2xl rounded-full hover:bg-primary hover:text-primary-darker focus:outline-none"
        >
            <BiFontFamily/>
        </button>
    );
};

export default FontSelector;