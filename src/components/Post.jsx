import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import usePostStore from '../store/postslice';
import './style.scss';

const Post = () => {
  const { postID } = useParams();
  const navigate = useNavigate();
  const { fetchPost, updatePost, deletePost } = usePostStore((state) => ({
    fetchPost: state.fetchPost,
    updatePost: state.updatePost,
    deletePost: state.deletePost,
  }));
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchPost(postID).then((data) => setPost({
      ...data,
      tags: typeof data.tags === 'string' ? data.tags.split(',') : data.tags,
    }));
  }, [postID, fetchPost]);

  if (!post) return <div className="post-loading">Loading...</div>;

  const handleEditToggle = () => {
    if (editMode) {
      updatePost(postID, {
        ...post,
        tags: post.tags.join(','),
      }).catch(console.error);
    }
    setEditMode(!editMode);
  };

  const handleChange = (field, value) => {
    setPost((prev) => ({
      ...prev,
      [field]: field === 'tags' ? value.split(',') : value,
    }));
  };

  const handleDelete = () => {
    deletePost(postID)
      .then(() => {
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <div className="post-container">
      <h1 className="post-title">
        {editMode ? (
          <input
            className="title-input"
            value={post.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        ) : (
          post.title
        )}
      </h1>
      <div className="post-content">
        {editMode ? (
          <textarea
            className="content-textarea"
            value={post.content}
            onChange={(e) => handleChange('content', e.target.value)}
          />
        ) : (
          <Markdown>{post.content}</Markdown>
        )}
      </div>
      <p className="post-tags">
        <strong>Tags:</strong>
        {editMode ? (
          <input
            className="tags-input"
            value={post.tags.join(',')}
            onChange={(e) => handleChange('tags', e.target.value)}
          />
        ) : (
          post.tags.join(', ')
        )}
      </p>
      {editMode ? (
        <input
          className="cover-url-input"
          value={post.coverUrl}
          onChange={(e) => handleChange('coverUrl', e.target.value)}
        />
      ) : (
        <img className="post-image" src={post.coverUrl} alt="Cover" />
      )}
      <div className="buttonsContainer">
        <button
          className="edit-button"
          type="button"
          onClick={handleEditToggle}
        >
          {editMode ? 'Save' : 'Edit'}
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;