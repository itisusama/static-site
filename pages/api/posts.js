import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'data.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const posts = JSON.parse(jsonData);
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, content } = req.body;
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const posts = JSON.parse(jsonData);
    const newPost = { id: Date.now(), title, content };
    posts.push(newPost);
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');
    res.status(201).json(newPost);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    let posts = JSON.parse(jsonData);
    posts = posts.filter((post) => post.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');
    res.status(200).json({ message: 'Post deleted' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
