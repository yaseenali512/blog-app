import React from 'react';

const CreatePostButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    >
      Create Post
    </button>
  );
}

export default CreatePostButton;
