import React from 'react';
import { Link } from 'react-router-dom';
import TerminalWindow from '../components/TerminalWindow';
import { useLocation } from 'react-router-dom';

const AccessDenied = () => {
    const location = useLocation();

    return (
        <TerminalWindow>
            <div className="text-primary mt-1">
                <div>&gt; Access denied.</div>
                {location.state && (<div>&gt; {location.state}</div>)}
                <div>&gt; Visit our <Link to="/about" className=' underline'>About Page</Link> for more information.</div>
            </div>
        </TerminalWindow>
    );
}

export default AccessDenied;
