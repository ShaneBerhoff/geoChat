import NavBar from "../components/Navbar";
import { useGlitch } from "react-powerglitch";
import { Helmet } from "react-helmet-async";

const About = () => {
    const glitch = useGlitch({
        "timing": {
            "duration": 3000
        },
        "glitchTimeSpan": {
            "end": 0.8
        }
    });

    return (
        <>
            <Helmet>
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://geochat.live/about" />
                <title>About geoChat - Privacy-First Local Chat Platform</title>
                <meta name="description" content="geoChat provides secure, anonymous chat rooms based on your location. No registration, no data collection, just instant local connections when you need them." />
                <meta name="keywords" content="geoChat features, anonymous messaging, location-based chat, private messaging, local communities, instant chat" />
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About geoChat - Privacy-First Local Chat Platform" />
                <meta property="og:description" content="geoChat provides secure, anonymous chat rooms based on your location. No registration, no data collection, just instant local connections when you need them." />
                <meta property="og:url" content="https://geochat.live/about" />
                {/* Twitter */}
                <meta property="twitter:title" content="About geoChat - Privacy-First Local Chat Platform" />
                <meta property="twitter:description" content="geoChat provides secure, anonymous chat rooms based on your location. No registration, no data collection, just instant local connections when you need them." />
            </Helmet>
            <div className="h-screen w-full bg-primary-darker p-2 text-primary flex flex-col ">
                <NavBar />
                <div className="w-full h-screen flex flex-col text-center overflow-hidden">
                    <div className="mx-auto justify-center pt-16">
                        <div className="text-5xl" ref={glitch.ref}>geoChat</div>
                        <div>Anonymous Local Chatrooms</div>
                    </div>
                    <div className="flex flex-row w-full h-full p-24 text-lg text-primary-dark">
                        <div className="flex-1 px-4 overflow-auto">
                            <div className="p-2 text-3xl text-primary">What is geoChat?</div>
                            <div>geoChat is a collection of entirely anonymous local live chatrooms. User's can join any room in their immediate vicinity and chat with other people in real time.</div>
                        </div>

                        <div className="flex-1 px-4 overflow-auto">
                            <div className="p-2 text-3xl text-primary">How It Works</div>
                            <div>It's <a className="underline" href="https://github.com/ShaneBerhoff/geoChat">super secret</a></div>
                        </div>

                        <div className="flex-1 px-4 overflow-auto">
                            <div className="p-2 text-3xl text-primary">Data Privacy</div>
                            <div>geoChat has no accounts, and your chats are only briefly linked to an alias you create. Once you leave it the connection is gone. Chat's only exist for 10 mintues and then they are gone from everywhere (including the database). Your location is only used to figure out which chat rooms you can access, the cordinates are never stored, and the information disappears with your alias too.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
