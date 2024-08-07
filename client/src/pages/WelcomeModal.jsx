import './styles/WelcomeModal.css';

const WelcomeModal = ({ handleEnteredUsername }) => {

    function handleSubmit(e) {
        console.log('handleSubmit');
        e.preventDefault();
        const username = document.getElementById("input").value;
        console.log('Username: ', username);
        
        /* make call to backend here */

        handleEnteredUsername();
    }

    return (
        <>
            <div className="container">
                <img className="logo" src="/geoChatLogo.jpeg" alt="Logo" />
                <h2>Welcome!</h2>
                <div className="input-container">
                    <form className="input-container" onSubmit={handleSubmit}>
                        <input id="input" autoComplete="off" placeholder="Enter an alias..." />
                        <button type="submit" className="send-button">➤</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default WelcomeModal;
