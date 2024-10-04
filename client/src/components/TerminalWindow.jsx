import React from 'react';
import { FcGlobe } from 'react-icons/fc';
import { useGlitch } from 'react-powerglitch';

const TerminalWindow = ({ children, title = 'geoChat' }) => {
    const glitch = useGlitch({ playMode: 'hover' });
    return (
        <div className='min-h-screen w-full bg-black flex items-center justify-center'>
            <div className='w-full max-w-xl p-4 h-screen max-h-96 flex flex-col'>
                <div className="bg-primary-darker rounded-lg shadow-lg overflow-hidden flex flex-col flex-grow">
                    <div className="bg-stone-900 px-4 py-2 flex items-center relative">
                        <div className="flex space-x-2 absolute left-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-grow flex justify-center items-end text-white text-sm">
                            <span ref={glitch.ref}><FcGlobe className='mr-1 text-lg' /></span>
                            <span className=''>{title}</span>
                        </div>
                    </div>
                    <div className="p-4 font-IBM-BIOS flex-grow overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TerminalWindow;