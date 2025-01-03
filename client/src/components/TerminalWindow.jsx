import React from 'react';
import { FcGlobe } from 'react-icons/fc';
import { useGlitch } from 'react-powerglitch';

const TerminalWindow = ({ children, title = 'geoChat' }) => {
    const glitch = useGlitch({
        "timing": {
            "duration": 3000
        },
        "glitchTimeSpan": {
            "end": 0.8
        }
    });
    return (
        <div className='min-h-screen w-full bg-black sm:flex items-center justify-center'>
            <div className="hidden">
                <a href="/">Home</a>
                <a href="/chatroom">Chat Room</a>
                <a href="/about">About</a>
            </div>
            <div className='relative w-full max-w-xl p-4 h-screen max-h-96 flex flex-col'>
                <div className="bg-primary-darker rounded-lg shadow-lg overflow-hidden flex flex-col flex-grow">
                    <div className="bg-stone-900 px-4 py-2 flex items-center relative">
                        <div className="flex space-x-2 absolute left-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-grow flex justify-center text-white text-sm">
                            <span ref={glitch.ref}><FcGlobe className='mr-1 text-lg' /></span>
                            <span className=''>{title}</span>
                        </div>
                    </div>
                    <div className="p-4  flex-grow overflow-auto text-2xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TerminalWindow;