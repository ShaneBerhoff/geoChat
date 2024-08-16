import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    async function onFormSubmit(event) {
        // get the username value
        event.preventDefault();
        const username = document.getElementById('username').value;

        try {
            const response = await fetch('/api/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username}),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.usernameValid) {
                    console.log("Sent to chatroom");
                    navigate('/chatroom');
                } else { 
                    // TODO: Chage to a popup letting them know the username is taken
                    console.log("Invalid Username")
                    navigate('/access-denied');
                }
            } else {
                console.log("Error")
                navigate('/access-denied');
            }
        } catch (error) {
            console.error('Error with username fetch operation:', error);
            navigate('/access-denied');
        }
    }

    return (
        <>
            <h1>Welcome to Our Chat App</h1>
            <p>Enter a pseudonym to start chatting!</p>
            <form id="form" onSubmit={onFormSubmit}>
                <input id="username" autoComplete="off" required />
                <input type="submit" value="Go to chat" />
            </form>
        </>
    );
}

export default Welcome;
