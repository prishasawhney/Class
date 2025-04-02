import React from 'react';
import "./LandingPage.css";
import litLabDay from '../../assets/Lit Lab Day.png';
import owlDay from '../../assets/Owl Day.png';
import sun from '../../assets/sun.png';


// import owlNight from '../Assets/Owl Night.png'
// import moon from '../Assets/Moon.svg'

export const LandingPage = () => {
return (
    <section id="LP-section">
        <div className="circle">
            <div className="image-container">
                {/* <img src={moon} alt="" /> */}
                <img src={sun} alt="" />
            </div>


        </div>
        <header>
        <a href="/" >
        <img src={litLabDay} alt="Logo" className="logo"/>
        {/* <img src={litLabNight2} alt="Logo" className="logo"/> */}
        C.L.A.S.S
        </a>

        <nav className="navbar"> 
            <ul className="nav-links">
                <li><a href="/login-signup">Login/ Signup</a></li>
            </ul>
        </nav>
    </header>
    <div className="content">
        <div className="textBox">
            <h2>Where <span> C</span>ognitive <span>L</span>earning meets<span> A</span>I for<span> S</span>kill & <span>S</span>uccess!"</h2>
            <p>Unlock your learning potential with our comprehensive platform designed to support you throughout your educational journey. With our Interview Preparation Analyzer, you’ll gain valuable insights into your interview skills. Create personalized flashcards with ease and solve image-based queries effortlessly. Stay organized and effectively manage your tasks with our Deadline Manager and other organizational tools, including a To-Do List, Notes, and Calendar. Join us at CLASS and elevate your education today!</p>
            <a href="/learn-more">Learn More</a>
        </div>
        <div className="imgBox">
            {/* Day Mode */}
            <img src={owlDay} alt="Coffee" className="starbucks" />

            {/* Night Mode */}

            {/* <img src={owlNight} alt="Coffee" className="starbucks" /> */}
        </div>
    </div>
    </section>
);
}

export default LandingPage;