import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FcGlobe } from "react-icons/fc";
import { useGlitch } from 'react-powerglitch';
import { TypingAnimation } from '../components/ui/typing-effect';

const Welcome = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const glitch = useGlitch({playMode: 'hover'});
    const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);

    async function handleUsernameSubmit(event) {
        event.preventDefault();
        
        const username = inputRef.current.value.trim();
        if (username === ""){
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
        <div className='min-h-screen w-full bg-black flex items-center justify-center'>
            <div className='w-full max-w-xl p-4 h-screen max-h-96 flex flex-col'>
                <div className="bg-background rounded-lg shadow-lg overflow-hidden flex flex-col flex-grow">
                    <div className="bg-gray-600 px-4 py-2 flex items-center relative">
                        <div className="flex space-x-2 absolute left-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-grow flex justify-center items-end text-white text-sm">
                            <span ref={glitch.ref}><FcGlobe className='mr-1 text-lg' /></span>
                            <span className='font-semibold'>geoChat</span>
                        </div>
                    </div>

                    <div className="p-4 font-mono font-semibold text-lg flex-grow overflow-auto">
                        <TypingAnimation
                            className="text-primary"
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
                        <form onSubmit={handleUsernameSubmit} className="mt-1">
                            <span className="text-primary">{"> "}</span>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder=""
                                className="text-primary outline-none bg-background"
                                autoComplete='off'
                            />
                        </form>
                        {!isUsernameValid && (
                            <TypingAnimation
                                className="text-secondary mt-1"
                                duration={50}
                                text="> This username is currently in use. Please select another."
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;