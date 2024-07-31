import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    async function onFormSubmit(event) {
        const navigate = useNavigate();

        event.preventDefault();
        const name = document.getElementById('name').value;

        if (name) {
            sessionStorage.setItem('username', name);
        }

        try {
            const response = await fetch('/api/validate');
            if (response.ok) {
                navigate('/chatroom');
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
            <form id="form" onSubmit={() => onFormSubmit()} method="get">
                <input id="name" autocomplete="off" required/>
                <input type="submit" value="Go to chat" />
            </form>
        </>
        
    );
}

export default Welcome;