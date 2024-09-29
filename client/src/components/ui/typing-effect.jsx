import { useEffect, useState } from "react";

export function TypingAnimation({
    text,
    duration = 200,
    className,
    onComplete
}) {
    const [displayedText, setDisplayedText] = useState("");
    const [i, setI] = useState(0);

    useEffect(() => {
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                setI(i + 1);
            } else {
                clearInterval(typingEffect);
                if (onComplete) onComplete();
            }
        }, duration);

        return () => {
            clearInterval(typingEffect);
        };
    }, [duration, i, text, onComplete]);

    return (
        <div className={className}>
            {displayedText}
        </div>
    );
}