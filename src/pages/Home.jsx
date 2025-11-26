import React, { useState } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const skills = [
  { id: 'Almonds', name: 'Almonds', image: '/images/Almonds.png' },
  { id: 'Cashews', name: 'Cashews', image: '/images/Cashew.png' },
  { id: 'Rasins', name: 'Rasins', image: '/images/Rasins.png' },
  { id: 'Walnuts', name: 'Walnuts', image: '/images/Walnuts.png' },
  { id: 'Dates', name: 'Dates', image: '/images/Dates.png' },
  { id: 'Pistachios', name: 'Pistachios', image: '/images/Pistachios.png' },
  { id: 'Apricots', name: 'Apricots', image: '/images/Apricots.png' },
  { id: 'Figs', name: 'Figs', image: '/images/Figs.png' },
  { id: 'Blueberry', name: 'Blueberry', image: '/images/Blueberry.png' },
  { id: 'Cranberry', name: 'Cranberry', image: '/images/Cranberry.png' },
  { id: 'Prunes', name: 'Prunes', image: '/images/Prunes.png' },
  
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);

  const renderCards = () => {
    const skillsToRender = searchQuery ? filteredSkills : skills;

    return skillsToRender.map((skill) => (
      <Link to={`/services/${skill.id}`} key={skill.id} className="card">
        <img src={skill.image} alt={skill.name} className="card-image" />
        <h3>{skill.name}</h3>
      </Link>
    ));
  };

  return (
    <>
      <div className="homepage">

        {/* VIDEO BANNER */}
        <div className="video-container">
          <video autoPlay loop muted playsInline className="home-video">
            <source src="/videos/videocarousel.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* HERO SECTION */}
        <h1 className="hero-text">Effortless Event Planning, All in One Place!</h1>
        <p className="hero-subtext">
          Book venues, catering, décor, photography, and more with ease.
          From weddings to corporate events, we make every moment unforgettable.
          Start planning today!
        </p>

        {/* CARDS SECTION */}
        <div className="home-container">

          {searchQuery && filteredSkills.length > 0 && (
            <div className="suggestions-container">
              <div className="suggestions-wrapper">
                {filteredSkills.map((skill) => (
                  <div key={skill.id} className="suggestion-item">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="cards-container">
            {renderCards()}
          </div>
        </div>

        {/* TEXT + IMAGE SECTIONS */}
        <h1 className="home-heading2">Turn your special moments into timeless memories</h1>

        <div className="image-text-container">
          <img src="/images/wed1.jpg" alt="Pre-Wedding Events" className="image" />
          <div className="text-content">
            <h3>Pre-Wedding Events</h3>
            <p>
              Celebrate love with unforgettable pre-wedding events!
              From Engagement to Mehendi, Sangeet, and Haldi, every moment crafted beautifully.
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <img src="/images/wed2.jpg" alt="Wedding Anniversary" className="image" />
          <div className="text-content">
            <h3>Wedding Anniversary</h3>
            <p>
              Secure your special day with us! Book in advance for seamless planning and availability. 🎉
            </p>
          </div>
        </div>

        <div className="image-text-container">
          <img src="/images/wed3.jpg" alt="Haldi Ceremony" className="image" />
          <div className="text-content">
            <h3>Haldi Ceremony</h3>
            <p>
              Celebrate the joy of your Haldi with vibrant colors, laughter, and traditions. 💛🎊
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
