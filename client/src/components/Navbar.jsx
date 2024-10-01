const NavBar = () => {
    return (
        <div className="w-full h-min lg:px-10 md:px-4 sm:px-2 flex flex-row items-center justify-center">

            <a className="mr-auto" href="/">
                <img src='/geoChatLogo.png' alt='Logo' className="h-8 w-8 m-2" />
            </a>
            
            <a href="/about" className="m-2 font-mono font-bold">About</a>
        </div>
    );
};

export default NavBar;