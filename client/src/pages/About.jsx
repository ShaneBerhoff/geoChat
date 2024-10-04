import NavBar from "../components/Navbar";

const About = () => {
    return (
        <div className="h-screen w-full bg-primary-darker p-2 text-primary flex flex-col ">
            <NavBar />
            <div className="w-full h-screen flex flex-col text-center overflow-hidden">
                <div className="mx-auto justify-center pt-16">
                    <div className="text-5xl">geoChat</div>
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
    )
}

export default About;
