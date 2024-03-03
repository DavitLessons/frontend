
import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

// Sample data for posts
const initialPostsData = [
  {
    id: 1,
    username: 'user1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    likes: 10,
    comments: [
      { id: 1, username: 'user2', text: 'Great post!' },
      { id: 2, username: 'user3', text: 'Nice content!' }
    ]
  },
  {
    id: 2,
    username: 'user2',
    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    likes: 20,
    comments: []
  },
  // Add more posts as needed
];

const App = () => {
  const [posts, setPosts] = useState(initialPostsData);
  const [newPostContent, setNewPostContent] = useState('');
  const [newCommentTexts, setNewCommentTexts] = useState({}); // Object to store new comment text for each post

  const handlePostSubmit = (event) => {
    event.preventDefault();

    if (newPostContent.trim() !== '') {
      const newPost = {
        id: posts.length + 1,
        username: 'Dato Kevlishvili', // Replace 'current_user' with the actual username of the logged-in user
        content: newPostContent,
        likes: 0,
        comments: []
      };

      setPosts([newPost, ...posts]);
      setNewPostContent('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const handleCommentSubmit = (postId, event) => {
    event.preventDefault();

    const postIndex = posts.findIndex(post => post.id === postId);
    const commentText = newCommentTexts[postId];
    if (postIndex !== -1 && commentText && commentText.trim() !== '') {
      const updatedPosts = [...posts];
      updatedPosts[postIndex].comments.push({
        id: updatedPosts[postIndex].comments.length + 1,
        username: 'Chiaberi', // Replace 'current_user' with the actual username of the logged-in user
        text: commentText
      });
      setPosts(updatedPosts);
      setNewCommentTexts({ ...newCommentTexts, [postId]: '' }); // Clear comment text for the current post
    }
  };

  const handleCommentInputChange = (postId, event) => {
    const { value } = event.target;
    setNewCommentTexts({ ...newCommentTexts, [postId]: value });
  };

  return (
    <div className="social-media-dashboard">
      <h1>Social Media Dashboard</h1>
      <div className="post-form">
        <form onSubmit={handlePostSubmit}>
          <textarea
            placeholder="Write your post..."
            value={newPostContent}
            onChange={(event) => setNewPostContent(event.target.value)}
            rows={4}
            cols={50}
          />
          <button type="submit">Post</button>
        </form>
      </div>
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-header">
              <span className="username">{post.username}</span>
              <button onClick={() => handleLike(post.id)}>Like</button>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-stats">
              <span className="likes">Likes: {post.likes}</span>
              <span className="comments">Comments: {post.comments.length}</span>
            </div>
            <div className="comments-section">
              <ul>
                {post.comments.map(comment => (
                  <li key={comment.id}>
                    <span className="comment-username">{comment.username}:</span> {comment.text}
                  </li>
                ))}
              </ul>
              <form onSubmit={(event) => handleCommentSubmit(post.id, event)}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newCommentTexts[post.id] || ''} // Use the corresponding new comment text for this post
                  onChange={(event) => handleCommentInputChange(post.id, event)}
                />
                <button type="submit">Comment</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
