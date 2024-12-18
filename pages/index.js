"use client"
import fs from 'fs';
import path from 'path';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dynamic Content</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-gray-800 rounded shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-300">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const posts = JSON.parse(jsonData);
  return { props: { posts } };
}
