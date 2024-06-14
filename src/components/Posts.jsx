import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import usePostStore from '../store/postslice';
import './style.scss';

const Posts = () => {
  const posts = usePostStore((state) => state.posts);
  const fetchAllPosts = usePostStore((state) => state.fetchAllPosts);

  useEffect(() => {
    const handleFocus = () => {
      fetchAllPosts();
    };
    fetchAllPosts();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchAllPosts]);

  if (!posts.length) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="postsContainer">
      {posts.map((post) => (
        <NavLink key={post.id} to={`/posts/${post.id}`} className="postItem">
          <div>
            <img src={post.coverUrl} alt={post.title} className="postImage" />
            <h2 className="postTitle">{post.title}</h2>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Posts;