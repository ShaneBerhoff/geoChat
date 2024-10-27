import NavBar from "../components/Navbar";
import { useGlitch } from "react-powerglitch";
import { Helmet } from "react-helmet-async";
import AboutSection from "../components/ui/about-section";

const About = () => {
    const glitch = useGlitch({
        "timing": {
            "duration": 10000
        },
        "glitchTimeSpan": {
            "end": 0.6
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
            <div className="h-screen w-full bg-primary-darker text-primary flex p-4">
                <div className="flex flex-col w-full h-full p-4 border-2 border-primary-dark">
                    <NavBar />
                    <div className="w-full h-screen flex flex-col overflow-auto scrollbar-hide">
                        <div className="mx-auto justify-center text-center p-16">
                            <div className="text-5xl" ref={glitch.ref}>geoChat</div>
                            <div>Anonymous Local Chatrooms</div>
                        </div>
                        <div className="flex flex-col w-full h-full space-y-2 text-lg text-primary-dark">
                            <AboutSection
                                title="What is geoChat?"
                                content="geoChat is a collection of entirely anonymous local live chat rooms. User's can join any room in their immediate vicinity and chat with other people in real time. There are no imaginary internet points, no accounts, just real local conversations."
                                className=""
                            />
                            <AboutSection
                                title="Why geoChat"
                                content="With the globalization of the internet in the 90s/2000s chat rooms took off as an exciting way to talk to people all over the world. Now every platform offers this by default and sometimes its a little much. In this new era geoChat's goal is to recreate the feeling of these old school chat rooms by connecting you with the strangers that you walk past every day."
                                className=""
                            />
                            <AboutSection
                                title="How does it work"
                                content={
                                    <>geoChat is completely open source so if you are curious about how any part works just <a href="https://github.com/ShaneBerhoff/geoChat" className="text-primary hover:text-primary-darker underline">take a look</a></>}
                                className=""
                            />
                            <AboutSection
                                title="Data Privacy"
                                content="We build geoChat with privacy in mind, because the truth is we have no interest in your data. There are no accounts, just alias that you temporarily create. Once you leave it the connection is gone. Oh also chat's only live for 20 minutes and then they are gone from everywhere (including the server). Your location is only used to figure out which chat rooms you can access, the coordinates are never stored, and the room information disappears with your alias too. If you don't believe us or want to make geoChat more secure just take a look(link)."
                                className=""
                            />
                            <AboutSection
                                title="Design Principles"
                                content="The main layout and feature choices are kept minimal, coming straight from old school chat rooms (with our own local twist). We didn't want to add useless features that stray from its intentions. geoChat is styled after monochrome monitors: only using one color at a time and different brightness levels to show emphasis. Each theme option corresponds to a specific phosphor type used in these monitors and other old display types."
                                className=""
                            />
                            <AboutSection
                                title="Supported Location"
                                content={<>Emory University, Lullwater Preserve, Clairmont Campus: <a href="https://github.com/ShaneBerhoff/geoChat" className="text-primary hover:text-primary-darker underline">What to add your own locations?</a></>}
                                className=""
                            />
                            <AboutSection
                                title="Feedback/Contributing"
                                content={
                                    <>
                                        If you want to give feedback, have a feature request, an idea to make geoChat better, or just want to say hi - <a href="mailto:shane@geochat.live" className="text-primary hover:text-primary-darker underline">contact me</a>
                                        . If you want to <a href="https://github.com/ShaneBerhoff/geoChat" className="text-primary hover:text-primary-darker underline">build a feature yourself</a>, go for it! The goal is for people to contribute and for it to grow as a community project.
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
