import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import LocationCheck from "./LocationCheck";

const NavBar = () => {
    return (
        <div className="w-full h-min lg:px-10 md:px-4 sm:px-2 flex flex-row items-center justify-center">

            <a className="mr-auto" href="/">
                <img src='/geoChatLogo.png' alt='Logo' className="h-8 w-8 m-2" />
            </a>
            <LocationCheck/>
            <FontSelector/>
            <ThemeSelector/>
            <a href="/about" className="m-2 text-lg">About</a>
        </div>
    );
};

export default NavBar;