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

  // Unique existing categories for suggestions and quick-selection
  const existingCategories = Array.from(
    new Map(
      skills
        .map((s) => s.category?.trim())
        .filter(Boolean)
        .map((cat) => [cat.toLowerCase(), cat])
    ).values()
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      proficiency: form.proficiency.trim(),
    };
    try {
      if (editingId) {
        await API.put(`/skills/${editingId}`, payload);
      } else {
        await API.post('/skills', payload);
      }
      setForm({ name: '', category: '', proficiency: '' });
      setEditingId(null);
      fetchSkills();
    } catch (err) {
      console.error('Error saving skill', err);
    }
  };

  const handleEdit = (skill) => {
    setForm({ name: skill.name || '', category: skill.category || '', proficiency: skill.proficiency || '' });
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
        <div className="flex flex-col gap-1">
          <input
            type="text"
            list="category-list"
            placeholder="Category (e.g. backend, frontend)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <datalist id="category-list">
            {existingCategories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>

          {/* Quick-select chips */}
          {existingCategories.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <span className="text-xs text-gray-500">Existing:</span>
              {existingCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`text-xs px-2 py-0.5 rounded border transition ${
                    form.category.trim().toLowerCase() === cat.toLowerCase()
                      ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
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
