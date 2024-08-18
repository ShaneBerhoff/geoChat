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
            const response = await fetch('/api/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username}),
            });

            if (response.ok) {
                console.log("Sent to chatroom");
                navigate('/chatroom');
            } else if (response.status === 409){
                console.log("Username already in use"); //TODO: Change to a popup letting them know
                navigate('/access-denied');
            } else {
                console.log("Server error");
                navigate('/access-denied');
            }
        } catch (error) {
            console.error('Error with username fetch operation:', error);
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
