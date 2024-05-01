import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const LandingPage = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={`container mx-auto p-8 ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <HeroSection darkMode={darkMode} />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
