import './styles/Navbar.css';

const NavBar = ({ isAboutPage}) => {
    return (
        <div className="nav">

            <a className="left" href="/chatroom">
                <img src='/geoChatLogo.png' alt='Logo' className="logo" />
            </a>
            
            { !isAboutPage && <div className="right">
                <a href="/about">About</a>
            </div> }
        </div>
    );
};

export default NavBar;
