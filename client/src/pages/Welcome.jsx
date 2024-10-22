import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { TypingAnimation } from '../components/ui/typing-effect';
import TerminalWindow from '../components/TerminalWindow';
import { Helmet } from 'react-helmet-async';

const Welcome = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);

    async function handleUsernameSubmit(event) {
        event.preventDefault();

        const username = inputRef.current.value.trim();
        if (username === "") {
            return;
        }

        try {
            const response = await fetch('/api/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username }),
            });
            if (response.ok) {
                console.log("Sent to chatroom");
                navigate('/chatroom');
            } else if (response.status === 409) {
                console.log("Username already in use");
                setIsUsernameValid(false);
                inputRef.current.value = '';
            } else {
                console.log("Server error");
                navigate('/access-denied');
            }
        } catch (error) {
            console.log("Error with username fetch operation")
            navigate('/access-denied');
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    return (
        <>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://geochat.live/" />
                <title>geoChat - Anonymous Local Chat Rooms</title>
                <meta name="description" content="geoChat is a collection of entirely anonymous local live chat rooms. Join any room in your immediate vicinity and chat with others in real time." />
                <meta name="keywords" content="geoChat, local chat rooms, live chat rooms, location-based chat, geo-social networking, anonymous chat, real-time messaging, nearby chat, community chat, local social network" />
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="geoChat - Anonymous Local Chat Rooms" />
                <meta property="og:description" content="geoChat is a collection of entirely anonymous local live chat rooms. Join any room in your immediate vicinity and chat with others in real time." />
                <meta property="og:url" content="https://geochat.live/" />
                {/* Twitter */}
                <meta property="twitter:title" content="geoChat - Anonymous Local Chat Rooms" />
                <meta property="twitter:description" content="geoChat is a collection of entirely anonymous local live chat rooms. Join any room in your immediate vicinity and chat with others in real time." />
            </Helmet>
            <TerminalWindow>
                <TypingAnimation
                    className="text-primary mt-1"
                    duration={50}
                    text="> Welcome to geoChat"
                    onComplete={() => setFirstAnimationComplete(true)}
                />
                {firstAnimationComplete && (
                    <TypingAnimation
                        className="text-primary mt-1"
                        duration={50}
                        text="> Enter an alias to start chatting"
                    />
                )}
                {!isUsernameValid && (
                    <TypingAnimation
                        className="text-primary mt-1"
                        duration={50}
                        text="> This username is currently in use. Please select another."
                    />
                )}
                <form onSubmit={handleUsernameSubmit} className="mt-1">
                    <span className="text-primary">{"> "}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder=""
                        className="text-primary outline-none bg-primary-darker"
                        autoComplete='off'
                        onChange={() => { setIsUsernameValid(true) }}
                    />
                </form>
            </TerminalWindow>
        </>
    );
}

export default Welcome;