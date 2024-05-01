import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/contact", {
        name,
        email,
        message,
        // senderEmail: email // Pass sender's email to the API
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending message:");
    }
  };

  return (
    <div className="container mx-auto px-6 mt-10 lg:px-8">
      <div className="flex justify-center space-x-6">
        <a
          href="https://www.linkedin.com/in/yaseen-ali-a26032240?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/yaseenali512"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-900"
        >
          GitHub
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100013836949524"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com/yasin_0kz?utm_source=qr&igsh=MXB6dTliMXd0b3N3dA=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-700"
        >
          Instagram
        </a>
        {/* Add other social media links here */}
      </div>
      {/* Contact Form */}
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mt-10 mb-8">Contact Me</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
