import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import LocationCheck from "./LocationCheck";

const NavBar = () => {
    return (
        <div className="w-full h-min lg:px-10 md:px-4 sm:px-2 flex flex-row items-center justify-center text-primary-dark">

            <a className="" href="/">
                <img src='/geoChatLogo.png' alt='Logo' className="h-8 w-8 m-2" />
            </a>
            <a
                href="/chatroom"
                className="p-2 rounded-full hover:bg-primary-dark hover:text-primary focus:outline-none w-10 h-10"
            >
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M4 2h18v16H6v2H4v-2h2v-2h14V4H4v18H2V2h2zm5 7H7v2h2V9zm2 0h2v2h-2V9zm6 0h-2v2h2V9z" fill="currentColor"/> </svg>
            </a>
            <a
                href="/about"
                className="p-2 mr-auto rounded-full hover:bg-primary-dark hover:text-primary focus:outline-none w-10 h-10"
            >
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M3 3h8v2H3v12h8V5h2v12h8V5h-8V3h10v16H13v2h-2v-2H1V3h2zm16 7h-4v2h4v-2zm-4-3h4v2h-4V7zm2 6h-2v2h2v-2z" fill="currentColor"/> </svg>
            </a>
            <LocationCheck />
            <FontSelector />
            <ThemeSelector />
        </div>
    );
};

export default NavBar;