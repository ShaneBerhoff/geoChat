import { IoLocationOutline } from "react-icons/io5";
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
            className="p-2 text-2xl rounded-full hover:bg-primary hover:text-primary-darker focus:outline-none"
        >
            <IoLocationOutline />
        </button>
    );
}

export default LocationCheck;