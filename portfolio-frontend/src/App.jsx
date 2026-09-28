import React, { useState, useEffect } from 'react';
import API from './utils/api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TerminalPlayground from './components/TerminalPlayground';
import AboutBento from './components/AboutBento';
import ServicesSection from './components/ServicesSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import BlogSection from './components/BlogSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [about, setAbout] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const [aboutRes, skillsRes, projectsRes, blogsRes, expRes, testRes, servRes] = await Promise.allSettled([
        API.get('/about'),
        API.get('/skills'),
        API.get('/projects'),
        API.get('/blogs'),
        API.get('/experience'),
        API.get('/testimonials'),
        API.get('/services'),
      ]);

      if (aboutRes.status === 'fulfilled') setAbout(aboutRes.value.data || {});
      if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value.data || []);
      if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value.data || []);
      if (blogsRes.status === 'fulfilled') setBlogs(blogsRes.value.data || []);
      if (expRes.status === 'fulfilled') setExperiences(expRes.value.data || []);
      if (testRes.status === 'fulfilled') setTestimonials(testRes.value.data || []);
      if (servRes.status === 'fulfilled') setServices(servRes.value.data || []);
    } catch (err) {
      console.error('Error fetching portfolio data', err);
    } finally {
      setLoading(false);
    }
  };

  const fullData = { about, skills, projects, blogs, experiences, testimonials, services };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar about={about} />

      {/* Main Content Sections */}
      <main>
        <Hero about={about} />
        
        <TerminalPlayground data={fullData} />
        
        <AboutBento about={about} />

        <ServicesSection services={services} />

        <SkillsSection skills={skills} />

        <ProjectsSection projects={projects} />

        <ExperienceSection experiences={experiences} />

        <BlogSection blogs={blogs} />

        <TestimonialsSection testimonials={testimonials} />

        <ContactSection about={about} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}