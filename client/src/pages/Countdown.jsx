import React, { useState, useRef, useEffect } from "react";
import { useGlitch } from 'react-powerglitch';

const Countdown = () => {
    const Ref = useRef(null);
    const [timer, setTimer] = useState("00:00:00:00");
    const [isInitial, setIsInitial] = useState(true);

    // Initialize the glitch effect
    const glitch = useGlitch({
        "timing": {
            "duration": 6000 // Duration of the glitch effect
        },
        "glitchTimeSpan": {
            "end": 0.6 // Time span during which the glitch will appear
        }
    });

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const startTimer = (e) => {
        let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            const newTime = 
                (days > 9 ? days : "0" + days) +
                ":" +
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds);

            // If the new time is not "00:00:00:00", stop the glitch effect
            if (newTime !== "00:00:00:00") {
                setIsInitial(false);
            }

            setTimer(newTime);
        }
    };

    const clearTimer = (e) => {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline = new Date(deadline.getFullYear(), 10, 1, 12, 0, 0); // November 1st at noon
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-primary-darker text-white flex-col">
            <h1 className="text-4xl mb-4 text-primary-dark p-2 rounded">geoChat</h1>
            {/* Apply glitch effect using the custom glitch hook on the initial state */}
            <h2 ref={glitch.ref} className={`text-3xl text-primary p-2 rounded`}>
                {timer}
            </h2>
        </div>
    );
};

export default Countdown;
