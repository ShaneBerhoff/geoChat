import React from 'react';
import { Link } from 'react-router-dom';
import TerminalWindow from '../components/TerminalWindow';

const AccessDenied = () => {
    return (
        <TerminalWindow>
            <div className="text-primary mt-1">
                <div>&gt; Access denied.</div>
                <div>&gt; You are in an unauthorized location. </div>
                <div>&gt; Visit our <Link to="/about" className='text-secondary font-mono font-semibold underline'>About Page</Link> for more information.</div>
            </div>
        </TerminalWindow>
    );
}

export default AccessDenied;
