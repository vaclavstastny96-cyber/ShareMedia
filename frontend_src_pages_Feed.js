import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feed.css';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data.posts);
    } catch (err) {
      setError('Failed to load feed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="feed-container"><p>Loading...</p></div>;

  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        <h1>Your Feed</h1>
        {error && <p className="error">{error}</p>}
        {posts.length === 0 ? (
          <p className="no-posts">No posts yet. Start uploading!</p>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-media">
                  {post.type === 'image' ? (
                    <img src={post.mediaUrl} alt={post.title} />
                  ) : (
                    <video src={post.mediaUrl} controls></video>
                  )}
                </div>
                <div className="post-info">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <small>by {post.author.username}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;