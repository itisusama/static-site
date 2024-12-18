import '../styles/globals.css';
import { useState, useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load the dark mode state from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode and save the state
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <nav className="flex justify-between items-center px-6 py-4 bg-gray-800">
          <div className="text-xl font-bold">My Static Site</div>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/admin" className="hover:underline">
                Admin
              </a>
            </li>
          </ul>
          <button
            className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
        <main className="p-6">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}
