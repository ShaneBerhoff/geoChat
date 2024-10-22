import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import LocationCheck from "./LocationCheck";
import { useState } from "react";

const NavBar = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [propsIsOpen, setPropsIsOpen] = useState(false);

  return (
    <div className="w-full h-10 flex flex-row items-center px-4 justify-between">
        <div className="hidden">
            <a href="/">Home</a>
            <a href="/chatroom">Chat Room</a>
            <a href="/about">About</a>
        </div>
      <div className="flex items-center">
        <button className="z-10" onClick={() => setNavIsOpen(!navIsOpen)}>
          <img src='/geoChatLogo.png' alt='Logo' className="h-8 w-8" />
        </button>
        <div className={`flex items-center transition-all duration-500 ease-in-out space-x-4 overflow-hidden ${navIsOpen ? 'max-w-32 ml-4' : 'max-w-0 opacity-0 ml-0'}`}>
          <a className="shrink-0" href="/">
            <svg className="w-8 h-8 hover:text-primary-dark" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15 2H9v2H7v6h2V4h6V2zm0 8H9v2h6v-2zm0-6h2v6h-2V4zM4 16h2v-2h12v2H6v4h12v-4h2v6H4v-6z" fill="currentColor" />
            </svg>
          </a>
          <a className="shrink-0" href="/chatroom">
            <svg className="w-8 h-8 hover:text-primary-dark" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M4 2h18v16H6v2H4v-2h2v-2h14V4H4v18H2V2h2zm5 7H7v2h2V9zm2 0h2v2h-2V9zm6 0h-2v2h2V9z" fill="currentColor" />
            </svg>
          </a>
          <a className="shrink-0" href="/about">
            <svg className="w-8 h-8 hover:text-primary-dark" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M3 3h8v2H3v12h8V5h2v12h8V5h-8V3h10v16H13v2h-2v-2H1V3h2zm16 7h-4v2h4v-2zm-4-3h4v2h-4V7zm2 6h-2v2h2v-2z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
      <div className="flex items-center">
        <div className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden ${propsIsOpen ? 'max-w-32 mr-2' : 'max-w-0 mr-0 opacity-0'}`}>
          <div className="shrink-0">
            <LocationCheck />
            <FontSelector />
            <ThemeSelector />
          </div>
        </div>
        <button className="w-8 h-8 z-10" onClick={() => setPropsIsOpen(!propsIsOpen)}>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M17 4h2v10h-2V4zm0 12h-2v2h2v2h2v-2h2v-2h-4zm-4-6h-2v10h2V10zm-8 2H3v2h2v6h2v-6h2v-2H5zm8-8h-2v2H9v2h6V6h-2V4zM5 4h2v6H5V4z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NavBar;