import "./Hero.css";


const Hero = ({ text, backdrop }) => {
  return (
    <header className="p-5 heroHeader" style={{ zIndex: 1 }}>
      <h2 className="hero-heading" style={{ zIndex: 1 }}>{text}</h2>
      {backdrop &&
        <div className="hero-background" style={{ backgroundImage: `url(${backdrop})` }}></div>
      }
    </header>
  )
};

export default Hero