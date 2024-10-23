import React, { useState, useEffect } from "react";
import { useGlitch } from "react-powerglitch";
import { useLogo } from "../hooks/useLogo";

const Countdown = ({ onLaunch, launchDate }) => {
    const [timeRemaining, setTimeRemaining] = useState("");
    const [shouldDisplay, setShouldDisplay] = useState(true);
    const logoUrl = useLogo();
    const glitch = useGlitch({
        "timing": {
            "duration": 6000
        },
        "glitchTimeSpan": {
            "end": 0.6
        }
    });

    useEffect(() => {
        const targetDate = launchDate;

        const updateTimer = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / 86400000);
                const hours = Math.floor((difference % 86400000) / 3600000);
                const minutes = Math.floor((difference % 3600000) / 60000);
                const seconds = Math.floor((difference % 60000) / 1000);

                setTimeRemaining(
                    `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );
            } else {
                setTimeRemaining("Starting Now...");
                // Wait 2 seconds to show "Starting Now..." then fade out
                setTimeout(() => {
                    setShouldDisplay(false);
                    if (onLaunch) onLaunch();
                }, 2000);
                clearInterval(timerInterval);
            }
        };

        // Check if we're already past launch date on initial load
        if (new Date() >= targetDate) {
            setShouldDisplay(false);
            if (onLaunch) onLaunch();
            return;
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval);
    }, [onLaunch, launchDate]);

    if (!shouldDisplay) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-primary-darker text-primary flex-col space-y-10 z-50 transition-opacity duration-1000">
            <img ref={glitch.ref} src={logoUrl} alt='Logo' className="w-32 h-32" />
            <div className="text-6xl">geoChat</div>
            <div className="text-5xl text-primary-dark">
                {timeRemaining}
            </div>
        </div>
    );
};

export default Countdown;