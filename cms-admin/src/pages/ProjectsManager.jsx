import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Plus, Trash2, Edit, UploadCloud, Loader2 } from 'lucide-react';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', githubUrl: '', liveUrl: '', technologies: '' });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects', err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setUploadSuccess(false);

    try {
      const res = await API.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = res.data.url;
      const finalUrl = uploadedUrl && uploadedUrl.startsWith('http')
        ? uploadedUrl
        : (import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8080') + uploadedUrl;

      setForm((prev) => ({ ...prev, imageUrl: finalUrl }));
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err) {
      console.error('Image upload failed', err);
      alert('Image upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/projects/${editingId}`, form);
      } else {
        await API.post('/projects', form);
      }
      setForm({ title: '', description: '', imageUrl: '', githubUrl: '', liveUrl: '', technologies: '' });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error('Error saving project', err);
    }
  };

  const handleEdit = (project) => {
    setForm(project);
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await API.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project', err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>

      {/* Project Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" placeholder="Project Title" value={form.title} 
          onChange={(e) => setForm({ ...form, title: e.target.value })} 
          className="p-2.5 border rounded-lg bg-white" required 
        />
        <input 
          type="text" placeholder="Technologies (e.g. React, Spring Boot)" value={form.technologies} 
          onChange={(e) => setForm({ ...form, technologies: e.target.value })} 
          className="p-2.5 border rounded-lg bg-white" required 
        />
        <input 
          type="text" placeholder="GitHub URL" value={form.githubUrl} 
          onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} 
          className="p-2.5 border rounded-lg bg-white" 
        />
        <input 
          type="text" placeholder="Live Demo URL" value={form.liveUrl} 
          onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} 
          className="p-2.5 border rounded-lg bg-white" 
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Image (Cloudinary Upload)</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm font-medium text-gray-700 shadow-sm transition">
              {uploading ? <Loader2 className="animate-spin" size={16} /> : <UploadCloud size={16} />}
              <span>{uploading ? 'Uploading to Cloudinary...' : 'Choose Image'}</span>
              <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" disabled={uploading} />
            </label>
            <input 
              type="text" 
              placeholder="Or paste direct image URL" 
              value={form.imageUrl || ''} 
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} 
              className="p-2 border rounded-lg flex-1 text-sm bg-white" 
            />
          </div>

          {form.imageUrl && (
            <div className="mt-3 flex items-center gap-4 bg-white p-2.5 rounded-lg border border-gray-200 w-fit">
              <img src={form.imageUrl} alt="Project Preview" className="w-20 h-14 object-cover rounded border" />
              <div className="text-xs">
                {uploadSuccess && <p className="text-green-600 font-semibold mb-0.5">✓ Uploaded to Cloudinary successfully!</p>}
                <p className="text-gray-500 truncate max-w-xs font-mono">{form.imageUrl}</p>
                <button 
                  type="button" 
                  onClick={() => setForm((prev) => ({ ...prev, imageUrl: '' }))} 
                  className="text-red-500 hover:text-red-700 mt-1"
                >
                  Remove Image
                </button>
              </div>
            </div>
          )}
        </div>

        <textarea 
          placeholder="Project Description" value={form.description} 
          onChange={(e) => setForm({ ...form, description: e.target.value })} 
          className="p-2.5 border rounded-lg md:col-span-2 bg-white" rows="3" required 
        />
        <div className="md:col-span-2 flex gap-4 mt-2">
          <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-500 transition font-medium shadow-sm">
            {editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', imageUrl: '', githubUrl: '', liveUrl: '', technologies: '' }); }} className="bg-gray-400 text-white px-4 py-2.5 rounded-lg font-medium">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="border p-4 rounded-xl bg-white shadow-sm flex flex-col justify-between">
            <div>
              {proj.imageUrl && (
                <div className="aspect-video w-full mb-3 rounded-lg overflow-hidden bg-gray-100 border">
                  <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="font-bold text-lg text-gray-900">{proj.title}</h3>
              <p className="text-xs font-mono text-blue-600 mb-2">{proj.technologies}</p>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{proj.description}</p>
            </div>
            <div className="flex justify-end gap-2 border-t pt-3">
              <button onClick={() => handleEdit(proj)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(proj.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}