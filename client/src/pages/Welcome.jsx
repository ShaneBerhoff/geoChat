import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    async function onFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;

        if (name) {
            sessionStorage.setItem('username', name);
        }

        try {
            const response = await fetch('/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // You can send an empty body or include any necessary data
                body: JSON.stringify({}),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.isValid) {
                    navigate('/chatroom');
                } else {
                    navigate('/access-denied');
                }
            } else {
                navigate('/access-denied');
            }
        } catch (error) {
            console.error('Error:', error);
            navigate('/access-denied');
        }
    }

    return (
        <>
            <h1>Welcome to Our Chat App</h1>
            <p>Enter a pseudonym to start chatting!</p>
            <form id="form" onSubmit={onFormSubmit} method="get">
                <input id="name" autoComplete="off" required />
                <input type="submit" value="Go to chat" />
            </form>
        </>
    );
}

export default Welcome;
