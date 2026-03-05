import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile({ user }) {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/posts/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPosts(response.data.posts);
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="profile-container"><p>Loading...</p></div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <h1>{user?.username}</h1>
          <p>{user?.email}</p>
          <p className="post-count">{userPosts.length} posts</p>
        </div>
      </div>

      <div className="profile-content">
        <h2>Your Posts</h2>
        {error && <p className="error">{error}</p>}
        {userPosts.length === 0 ? (
          <p className="no-posts">You haven't uploaded any posts yet.</p>
        ) : (
          <div className="posts-grid">
            {userPosts.map((post) => (
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
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;