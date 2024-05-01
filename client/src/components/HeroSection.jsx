import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from 'react-icons/fa';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi'; // Import icons for read more/less buttons
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
const HeroSection = ({ darkMode }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState([]); // Track expanded state
  const loaderRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("http://localhost:8000/api/posts");

        if (isMounted) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadMorePosts = async () => {
    setIsLoading(true);

    try {
      const nextOffset = posts.length;
      const response = await axios.get(
        `http://localhost:8000/api/posts?offset=${nextOffset}`,
      );

      setPosts([...posts, ...response.data]);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => loaderRef.current && observer.unobserve(loaderRef.current);
  }, [hasMore, loaderRef]);

  const handleDelete = async (postId) => {
    console.log("Deleting post with ID:", postId);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      await axios.delete(`http://localhost:8000/api/delete/${postId}`, {
        headers: {
          Authorization: `Bearer Bearer ${token}`, // Corrected the Authorization header
        },
      });

      // Fetch updated list of posts from the server
      const response = await axios.get("http://localhost:8000/api/posts");
      setPosts(response.data);

      // Show success message
      toast.success("Post deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // Function to toggle content expansion for a specific post
  const toggleExpanded = (postId) => {
    setExpandedPosts((prevExpanded) =>
      prevExpanded.includes(postId)
        ? prevExpanded.filter((id) => id !== postId) // Remove from expandedPosts
        : [...prevExpanded, postId], // Add to expandedPosts
    );
  };

  // Helper function to determine if content is JSX code
  const isJSX = (content) => {
    return /<[a-z][\s\S]*>/i.test(content);
  };

  // Function to copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div className={darkMode ? "bg-gray-900 py-20 sm:py-28" : "bg-gray-50 py-20 sm:py-28"}>
      <div className="container mx-auto px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 className={darkMode ? "text-4xl font-extrabold tracking-tight text-white sm:text-5xl" : "text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"}>
            From the Blog
          </h2>
          <p className={darkMode ? "mt-4 text-lg leading-7 text-gray-300 max-w-xl mx-auto" : "mt-4 text-lg leading-7 text-gray-600 max-w-xl mx-auto"}>
            Learn how to grow your business with our expert advice.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-8 mt-8">
          {posts.map((post) => (
            <article key={post._id} className={`shadow-md rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
              <div className="relative overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full object-cover" style={{height: 'auto'}} />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3">
                  <a href={post.href} className="hover:text-indigo-600">
                    {post.title}
                  </a>
                </h3>
                <div className="text-sm">
                  <p className="font-semibold">
                    <a href={post.author.href} className="hover:text-indigo-600">
                      {post.author}
                    </a>
                  </p>
                </div>
                <div className="mt-3">
                  {/* Conditionally render JSX code or regular text */}
                  {isJSX(post.content) ? (
                    <div className="relative">
                      <SyntaxHighlighter language="jsx" style={vscDarkPlus}>
                        {post.content}
                      </SyntaxHighlighter>
                      <button className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-700" onClick={() => copyToClipboard(post.content)}>
                        <FaCopy className="w-7 h-7"/>
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className={`text-base ${expandedPosts.includes(post._id) ? '' : 'line-clamp-3'} mb-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        {expandedPosts.includes(post._id) ? post.content : post.content.slice(0, 150) + " ..."}
                      </p>
                      {post.content.length > 150 && (
                        <div className="flex items-center gap-3">
                          {/* Use conditional rendering to show either "Read more" or "Read less" button */}
                          {expandedPosts.includes(post._id) ? (
                            <button onClick={() => toggleExpanded(post._id)} className="text-indigo-600 hover:text-indigo-700 font-medium">
                              <BiChevronUp /> Read less
                            </button>
                          ) : (
                            <button onClick={() => toggleExpanded(post._id)} className="text-indigo-600 hover:text-indigo-700 font-medium">
                              <BiChevronDown /> Read more
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={() => handleDelete(post._id)} className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
      </div>
  );
};

export default HeroSection;
