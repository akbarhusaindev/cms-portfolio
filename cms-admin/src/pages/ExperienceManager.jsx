import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Trash2, Edit } from 'lucide-react';

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({ role: '', company: '', duration: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await API.get('/experience');
      setExperiences(res.data);
    } catch (err) {
      console.error('Error fetching experiences', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/experience/${editingId}`, form);
      } else {
        await API.post('/experience', form);
      }
      setForm({ role: '', company: '', duration: '', description: '' });
      setEditingId(null);
      fetchExperiences();
    } catch (err) {
      console.error('Error saving experience', err);
    }
  };

  const handleEdit = (exp) => {
    setForm({ role: exp.role, company: exp.company, duration: exp.duration, description: exp.description });
    setEditingId(exp.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await API.delete(`/experience/${id}`);
        fetchExperiences();
      } catch (err) {
        console.error('Error deleting experience', err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Experience</h2>

      {/* Experience Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text" placeholder="Role / Position" value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="p-2 border rounded" required
        />
        <input
          type="text" placeholder="Company Name" value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="p-2 border rounded" required
        />
        <input
          type="text" placeholder="Duration (e.g. Jan 2024 - Present)" value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="p-2 border rounded md:col-span-2" required
        />
        <textarea
          placeholder="Description of your role and responsibilities" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border rounded md:col-span-2" rows="4" required
        />
        <div className="md:col-span-2 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
            {editingId ? 'Update Experience' : 'Add Experience'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ role: '', company: '', duration: '', description: '' }); }} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{exp.role}</h3>
              <p className="text-sm text-blue-600">{exp.company}</p>
              <p className="text-xs text-gray-500 mb-2">{exp.duration}</p>
              <p className="text-gray-700 text-sm">{exp.description}</p>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button onClick={() => handleEdit(exp)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
