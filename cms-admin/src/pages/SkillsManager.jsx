import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', proficiency: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await API.get('/skills');
      setSkills(res.data);
    } catch (err) {
      console.error('Error fetching skills', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/skills/${editingId}`, form);
      } else {
        await API.post('/skills', form);
      }
      setForm({ name: '', category: '', proficiency: '' });
      setEditingId(null);
      fetchSkills();
    } catch (err) {
      console.error('Error saving skill', err);
    }
  };

  const handleEdit = (skill) => {
    setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency });
    setEditingId(skill.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await API.delete(`/skills/${id}`);
        fetchSkills();
      } catch (err) {
        console.error('Error deleting skill', err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>

      {/* Skill Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text" placeholder="Skill Name (e.g. React)" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded" required
        />
        <input
          type="text" placeholder="Category (e.g. Frontend)" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="p-2 border rounded" required
        />
        <input
          type="text" placeholder="Proficiency (e.g. Advanced)" value={form.proficiency}
          onChange={(e) => setForm({ ...form, proficiency: e.target.value })}
          className="p-2 border rounded"
        />
        <div className="md:col-span-3 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
            {editingId ? 'Update Skill' : 'Add Skill'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', category: '', proficiency: '' }); }} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="border p-4 rounded-lg shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg">{skill.name}</h3>
              <p className="text-sm text-blue-600">{skill.category}</p>
              {skill.proficiency && <p className="text-xs text-gray-500 mt-1">{skill.proficiency}</p>}
            </div>
            <div className="flex justify-end gap-2 border-t pt-3 mt-3">
              <button onClick={() => handleEdit(skill)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(skill.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
