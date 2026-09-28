import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AboutManager from './pages/AboutManager';
import ProjectsManager from './pages/ProjectsManager';
import SkillsManager from './pages/SkillsManager';
import BlogsManager from './pages/BlogsManager';
import ExperienceManager from './pages/ExperienceManager';
import TestimonialsManager from './pages/TestimonialsManager';
import ServicesManager from './pages/ServicesManager';
import MessagesViewer from './pages/MessagesViewer';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin_token');
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<div className="text-gray-500 text-center py-12">Select a menu item from the sidebar to manage your portfolio content.</div>} />
          <Route path="about" element={<AboutManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="blogs" element={<BlogsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="messages" element={<MessagesViewer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}