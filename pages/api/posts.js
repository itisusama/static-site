let posts = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    posts = posts.filter((post) => post.id !== id);
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
