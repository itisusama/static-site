"use client"
import { useState, useEffect } from 'react';

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleAdd = async () => {
    const newPost = { title, content };
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    const savedPost = await res.json();
    setPosts([...posts, savedPost]);
    setTitle('');
    setContent('');
  };

  const handleDelete = async (id) => {
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add Post
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Manage Posts</h2>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-gray-800 rounded shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-300">{post.content}</p>
            <button
              className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded mt-2"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
