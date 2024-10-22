import { useState, useEffect } from 'react';

const fonts = [
    { name: 'IBM VGA', value: 'IBM VGA, monospace' },
    { name: 'Cordata PPC', value: 'Cordata PPC, monospace' },
];

export const initializeFont = () => {
    const savedFontName = localStorage.getItem('font');
    const foundFont = fonts.find(f => f.name === savedFontName);
    const initialFont = foundFont ? foundFont.value : fonts[0].value;
    document.body.style.fontFamily = initialFont;
    return initialFont;
};

export const useFont = () => {
    const [font, setFont] = useState(initializeFont);

    useEffect(() => {
        document.body.style.fontFamily = font;
        const currentFont = fonts.find(f => f.value === font);
        if (currentFont) {
            localStorage.setItem('font', currentFont.name);
        }
    }, [font]);

    return { font, setFont, fonts };
};