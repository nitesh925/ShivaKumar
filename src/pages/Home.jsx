import React, { useState } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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

  // Carousel page state
  const [page, setPage] = useState(0);

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
{/* SKILL CARDS */}
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
        {/* VIDEO BANNER */}
        <div className="video-container">
          <video autoPlay loop muted playsInline className="home-video">
            <source src="/videos/videocarousel.mp4" type="video/mp4" />
          </video>
        </div>

        {/* HERO SECTION */}
        <h1 className="hero-text">Eat better. Live better.</h1>
        <p className="hero-subtext">
          Fuel your day with pure, premium, and consciously sourced goodness.
        </p>


        

        {/* HEALTH CATEGORY CAROUSEL */}
        <div className="health-carousel">

          

            {/* PAGE 1 */}
            <div className="health-page">
              <div className="health-card">
                <div className="circle green">
                  <img src="/images/fitness.png" alt="Fitness" />
                </div>
                <h3>Fitness</h3>
                <p>Energize your workouts with clean, nutrient-dense dry fruits.</p>
              </div>

              <div className="health-card">
                <div className="circle beige">
                  <img src="/images/maternity.png" alt="Maternity" />
                </div>
                <h3>Maternity</h3>
                <p>Support healthy motherhood with iron-rich, nourishing snacks.</p>
              </div>
            </div>

            {/* PAGE 2 */}
            <div className="health-page">
              <div className="health-card">
                <div className="circle lightgreen">
                  <img src="/images/kids.png" alt="Kids" />
                </div>
                <h3>Kids</h3>
                <p>Give your kids natural energy boosters packed with goodness.</p>
              </div>

              <div className="health-card">
                <div className="circle pink">
                  <img src="/images/eldercare.png" alt="Elder Care" />
                </div>
                <h3>Elder Care</h3>
                <p>Strengthen immunity and wellness with premium dry fruits.</p>
              </div>
            </div>
          
          <br></br>
         
        </div>
        {/* IMAGE + TEXT SECTIONS */}
        
      </div>
    </>
  );
};

export default Home;
