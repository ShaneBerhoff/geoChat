import NavBar from "../components/Navbar";
import './styles/About.css';

const About = () => {
    return (
        <div className="about-page">
            <NavBar isAboutPage={true} />
            <div className="text-container">
                <div className="title">
                    <h1>geoChat</h1>
                    <p>Anonymous Campus Chatrooms</p>
                </div>
                <div className="columns">
                    <div>
                        <h2><strong>What is geoChat?</strong></h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>

                    <div>
                        <h2><strong>Data Privacy</strong></h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>

                    <div>
                        <h2><strong>How It Works</strong></h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>

                    <div>
                        <h2><strong>What is geoChat?</strong></h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default About;
