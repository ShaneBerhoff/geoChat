import React from 'react';
import { Link } from 'react-router-dom';
import './styles/AccessDenied.css';

const AccessDenied = () => {
    return (
        <div className='wrapper'>
            <div className='content-container'>
                <div className='terminal'>
                    <p>&gt; Access denied.</p>
                    <p>&gt; You are in an unauthorized location. </p>
                    <p>&gt; Visit our <Link to="/about" className="lime-text"><u>About Page</u></Link> for more information.</p>
                </div>
            </div>
        </div>
    );
}

export default AccessDenied;
