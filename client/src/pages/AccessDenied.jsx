import React from 'react';
import { Link } from 'react-router-dom';
import TerminalWindow from '../components/TerminalWindow';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AccessDenied = () => {
    const location = useLocation();

    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex, follow" />
                <link rel="canonical" href="https://geochat.live/access-denied" />
                <title>Access Denied | geoChat - Location Settings</title>
                <meta name="description" content="To use geoChat, please enable location access or check if your area is supported. geoChat requires location services to connect you with local chat rooms." />
                <meta name="keywords" content="geoChat location settings, enable location services, supported areas, location requirements, local chat access" />
                <meta name="robots" content="noindex, follow" />
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Access Denied | geoChat - Location Settings" />
                <meta property="og:description" content="To use geoChat, please enable location access or check if your area is supported. geoChat requires location services to connect you with local chat rooms." />
                <meta property="og:url" content="https://geochat.live/access-denied" />
                {/* Twitter */}
                <meta property="twitter:title" content="Access Denied | geoChat - Location Settings" />
                <meta property="twitter:description" content="To use geoChat, please enable location access or check if your area is supported. geoChat requires location services to connect you with local chat rooms." />
            </Helmet>
            <TerminalWindow>
                <div className="text-primary mt-1">
                    <div>&gt; Access denied.</div>
                    {location.state && (<div>&gt; {location.state}</div>)}
                    <div>&gt; Visit our <Link to="/about" className=' underline'>About Page</Link> for more information.</div>
                </div>
            </TerminalWindow>
        </>
    );
}

export default AccessDenied;
