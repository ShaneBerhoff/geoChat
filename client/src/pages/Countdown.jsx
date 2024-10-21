import React, { useState, useEffect } from "react";
import { useGlitch } from "react-powerglitch";

const Countdown = () => {
    const [timeRemaining, setTimeRemaining] = useState("");
    const glitch = useGlitch({
        "timing": {
            "duration": 6000
        },
        "glitchTimeSpan": {
            "end": 0.6
        }
    });

    useEffect(() => {
        const targetDate = new Date(new Date().getFullYear(), 10, 1, 12, 0, 0);

        const updateTimer = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / 86400000);
                const hours = Math.floor((difference % 86400000) / 3600000);
                const minutes = Math.floor((difference % 3600000) / 60000);
                const seconds = Math.floor((difference % 60000) / 1000);

                setTimeRemaining(
                    `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );
            } else {
                setTimeRemaining("Starting Now...");
                clearInterval(timerInterval);
            }
        };

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-primary-darker text-primary flex-col space-y-10">
            <img ref={glitch.ref} src='../geoChatLogo.png' alt='Logo' className="w-32 h-32" />
            <div className="text-6xl">geoChat</div>
            <div className="text-5xl text-primary-dark">
                {timeRemaining}
            </div>
        </div>
    );
};

export default Countdown;