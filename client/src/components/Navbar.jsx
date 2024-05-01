import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline"; 
import { Link } from "react-router-dom"; 
import logo from "../assets/images/logo.jpg";
import CreatePostButton from "./CreatePostButton";
import PostForm from '../components/PostForm';
import axios from "axios";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const navigation = [
    { name: "Home", href: "/landing", current: true },
    { name: "Contact", href: "/contact", current: false },
  ];

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/landing">
                    <img className="h-10 w-11" src={logo} alt="Your Company" />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          item.current
                            ? "bg-gray-900 text-white" 
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        } rounded-md px-3 py-2 text-sm font-medium`}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                     {/* Create Post Button */}
                    {/* {isAdmin && (
                      <div className="hidden sm:ml-6 sm:block">
                        <CreatePostButton onClick={toggleCreateForm}/>
                      </div>
                    )} */}
                    <CreatePostButton onClick={toggleCreateForm}/>
                    {showCreateForm && (
                      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
                        <div className="flex items-center justify-center min-h-screen">
                          <PostForm onClose={toggleCreateForm} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Dark Mode Toggle Button */}
              <div className="hidden sm:ml-6 sm:block">
                <button
                  onClick={toggleDarkMode}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block rounded-md px-3 py-2 text-base font-medium`}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              {/* Create Post Button */}
              {/* {isAdmin && <CreatePostButton onClick={toggleCreateForm}/>} */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
