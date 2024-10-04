import { useState, useEffect } from 'react';

const fonts = [
    { name: 'IBM BIOS', value: 'IBM BIOS' },
    { name: 'IBM VGA', value: 'IBM VGA' },
    { name: 'Cordata PPC', value: 'Cordata PPC' },
];

export const initializeFont = () => {
    const savedFont = localStorage.getItem('font');
    const initialFont = savedFont && fonts.some(f => f.value === savedFont)
        ? savedFont
        : fonts[0].value;

    document.body.style.fontFamily = initialFont;
    return initialFont;
};

export const useFont = () => {
    const [font, setFont] = useState(initializeFont);

    useEffect(() => {
        document.body.style.fontFamily = font;
        localStorage.setItem('font', font);
    }, [font]);

    return { font, setFont, fonts };
};