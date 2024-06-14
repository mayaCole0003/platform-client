import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const usePostStore = create((set, get) => ({
  posts: [],
  current: null,

  fetchAllPosts: async () => {
    try {
      const response = await axios.get('https://platform.cs52.me/api/posts?key=m_cole');
      set({ posts: response.data });
    } catch (error) {
      toast.error(`Error fetching posts: ${error.message}`);
    }
  },

  fetchPost: async (id) => {
    try {
      const response = await axios.get(`https://platform.cs52.me/api/posts/${id}?key=m_cole`);
      set({ current: response.data });
      return response.data;
    } catch (error) {
      toast.error(`Error fetching post: ${error.message}`);
      return null;
    }
  },

  createPost: async (newPost) => {
    try {
      const response = await axios.post('https://platform.cs52.me/api/posts?key=m_cole', newPost);
      set((state) => ({ posts: [...state.posts, response.data] }));
      return response.data;
    } catch (error) {
      toast.error(`Failed to create post: ${error.response?.data?.message}` || error.message);
      throw new Error('Failed to create post');
    }
  },

  updatePost: async (postId, updatedPost) => {
    try {
      const response = await axios.put(`https://platform.cs52.me/api/posts/${postId}?key=m_cole`, updatedPost);
      set((state) => ({
        posts: state.posts.map((post) => (post.id === postId ? { ...post, ...response.data } : post)),
        current: { ...get().current, ...response.data },
      }));
      return response.data;
    } catch (error) {
      toast.error(`Failed to update post: ${error.message}`);
      throw new Error('Failed to update post');
    }
  },

  deletePost: async (id) => {
    try {
      await axios.delete(`https://platform.cs52.me/api/posts/${id}?key=m_cole`);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
        current: get().current?.id === id ? null : get().current,
      }));
    } catch (error) {
      toast.error(`Failed to delete post: ${error.message}`);
      throw new Error('Failed to delete post');
    }
  },
}));

export default usePostStore;