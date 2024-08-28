import './styles/Navbar.css';

const NavBar = ({ isAboutPage}) => {
    return (
        <div className="nav">

            <a className="left" href="/chatroom">
                <img src='/geoChatLogo.png' alt='Logo' className="logo" />
                <h1>geoChat</h1>
            </a>
            
            { !isAboutPage && <div className="right">
                <a href="/about">About</a>
            </div> }
        </div>
    );
};

export default NavBar;
