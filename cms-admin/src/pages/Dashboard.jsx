import React from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, FolderGit2, Cpu, FileText, Briefcase, MessageSquare, LogOut, User, Star, Wrench } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold tracking-wider text-blue-400">Portfolio CMS</div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition">
            <LayoutDashboard size={20} /> Overview
          </Link>
          <Link to="/dashboard/about" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition">
            <User size={20} /> About / Profile
          </Link>
          <Link to="/dashboard/projects" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition">
            <FolderGit2 size={20} /> Projects
          </Link>
          <Link to="/dashboard/skills" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition">
            <Cpu size={20} /> Skills
          </Link>
          <Link to="/dashboard/blogs" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition">
            <FileText size={20} /> Blogs
          </Link>
          <Link to="/dashboard/experience" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition">
            <Briefcase size={20} /> Experience
          </Link>
          <Link to="/dashboard/testimonials" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition">
            <Star size={20} /> Testimonials
          </Link>
          <Link to="/dashboard/services" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition">
            <Wrench size={20} /> Services
          </Link>
          <Link to="/dashboard/messages" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition">
            <MessageSquare size={20} /> Messages
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 rounded text-red-400 hover:bg-gray-800 transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <span className="text-sm text-gray-500">Welcome back, Admin</span>
        </header>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
}