import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Lock, User as UserIcon, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/auth/login', {
        username: username.trim(),
        password: password.trim(),
      });

      if (response.data && response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error details:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        setError(`Cannot reach backend at ${API.defaults.baseURL}. Check if your backend is running or waking up.`);
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-950 text-white px-4">
      <form onSubmit={handleLogin} className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-2xl border border-gray-800">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Lock size={24} />
          </div>
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold tracking-tight">CMS Admin Login</h2>
        <p className="text-center text-xs text-gray-400 mb-6 font-mono">Secure Content Management System</p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400 flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Username</label>
          <div className="relative">
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              className="w-full rounded-xl bg-gray-800/80 p-3 pl-10 border border-gray-700 text-sm focus:outline-none focus:border-blue-500 transition"
              required
            />
            <UserIcon size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Password</label>
          <div className="relative">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl bg-gray-800/80 p-3 pl-10 border border-gray-700 text-sm focus:outline-none focus:border-blue-500 transition"
              required
            />
            <Lock size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-500 transition shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In to Dashboard</span>
          )}
        </button>
      </form>
    </div>
  );
}