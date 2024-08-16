import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './styles/Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    async function onFormSubmit(event) {
        event.preventDefault();
        const username = inputRef.current.value;

        try {
            const response = await fetch('/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, clientToken: sessionStorage.getItem('token') }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.locationValid && data.usernameValid) {
                    sessionStorage.setItem('token', data.sessionToken);
                    navigate('/chatroom');
                } else {
                    console.log("Invalid Access");
                    navigate('/access-denied');
                }
            } else {
                console.log("Error");
                navigate('/access-denied');
            }
        } catch (error) {
            console.error('Error with validation fetch operation:', error);
            navigate('/access-denied');
        }
    }

    return (
        <div className="wrapper">
            <div className='content-container'>
                <div className='terminal'>
                    <p>&gt; Welcome to geoChat.</p>
                    <p>&gt; Enter an alias to start chatting.</p>
                    <form className="form" id="form" onSubmit={onFormSubmit}>
                        <span style={{ paddingRight: '8px'}}>&gt; </span>
                        <input
                            id="username"
                            ref={inputRef} 
                            autoComplete="off"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
