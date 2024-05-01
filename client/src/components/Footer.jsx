import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="text-sm">We post blogs for education purpose. Our main focus is on Programming and Career in Computer Science</p>
          </div>
          {/* Column 2 */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <p className="text-sm">Email: contact@example.com</p>
            <p className="text-sm">Phone: +1234567890</p>
          </div>
          {/* Column 3 */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-sm hover:text-gray-400 transition-colors duration-300">
                Facebook
              </a>
              <a href="#" className="text-sm hover:text-gray-400 transition-colors duration-300">
                Twitter
              </a>
              <a href="#" className="text-sm hover:text-gray-400 transition-colors duration-300">
                Instagram
              </a>
            </div>
          </div>
        
        </div>
      </div>
    </footer>
  );
}

export default Footer;
