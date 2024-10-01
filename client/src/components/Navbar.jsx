const NavBar = ({ isAboutPage }) => {
    return (
        <div className="w-full h-full flex flex-row items-center justify-center">

            <a className="mr-auto" href="/chatroom">
                <img src='/geoChatLogo.png' alt='Logo' className="h-8 w-8 m-2" />
            </a>
            
            { !isAboutPage && 
                <a href="/about" className="m-2 font-mono font-bold">About</a> }
        </div>
    );
};

export default NavBar;