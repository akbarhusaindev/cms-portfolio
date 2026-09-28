import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { username, password });
      localStorage.setItem('admin_token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">CMS Admin Login</h2>
        {error && <div className="mb-4 rounded bg-red-500 p-2 text-sm text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm mb-2">Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded bg-gray-700 p-2 border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded bg-gray-700 p-2 border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full rounded bg-blue-600 py-2 font-semibold hover:bg-blue-500 transition">
          Login
        </button>
      </form>
    </div>
  );
}