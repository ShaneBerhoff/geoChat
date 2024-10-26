import useLocationCheck from "../hooks/useLocationCheck";

const LocationCheck = () => {
    const checkLocation = useLocationCheck();

    const handleClick = async() => {
        await checkLocation(true);
        window.location.reload();
    };

    return (
        <button
            onClick={handleClick}
            className="hover:text-primary-darker hover:bg-primary p-2 w-10 h-10 rounded-sm transition-all duration-300 ease-in-out"
            aria-label="Location"
        >
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"> 
                <title>Location</title>
                <path d="M13 2v4h5v5h4v2h-4v5h-5v4h-2v-4H6v-5H2v-2h4V6h5V2h2zM8 8v8h8V8H8zm2 2h4v4h-4v-4z" fill="currentColor"/> 
            </svg>
        </button>
    );
}

export default LocationCheck;