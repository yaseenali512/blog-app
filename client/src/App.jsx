import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import Contact from "./components/Contact";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 


  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAuthentication = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <BrowserRouter>
        <Routes>
          {/* Pass darkMode state and toggleDarkMode function to each page */}
         <Route path="/" element={!isAuthenticated && <LoginPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/signup" element={!isAuthenticated && <SignupPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/landing" element={<LandingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} /> 
          <Route path="*" element={<LandingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
