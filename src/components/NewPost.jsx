import React, { useState } from 'react';
import {
  TextInput, Textarea, Button, Container, Title, Paper, Space,
} from '@mantine/core';
import usePostStore from '../store/postslice';

const NewPost = () => {
  const createPost = usePostStore((state) => state.createPost);
  const [coverUrl, setCoverUrl] = useState('');
  const [tags, setTags] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()).join(', '),
      coverUrl,
    };
    await createPost(newPost);
    setTitle('');
    setContent('');
    setTags('');
    setCoverUrl('');
  };

  return (
    <Container size="sm" padding="md">
      <Paper padding="md" shadow="sm">
        <Title order={2}>Create A New Post</Title>
        <Space h="md" />
        <form onSubmit={handleSubmit}>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            label="Title"
            placeholder="Enter title"
          />
          <Space h="sm" />
          <TextInput
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            label="Tags"
            placeholder="Enter tags, separated by commas"
          />
          <Space h="sm" />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            label="Content"
            placeholder="Write your post content here"
            autosize
            minRows={3}
          />
          <Space h="sm" />
          <TextInput
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            label="Cover Image URL"
            placeholder="Enter cover image URL"
          />
          <Space h="md" />
          <Button type="submit" fullWidth>Create Post</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default NewPost;