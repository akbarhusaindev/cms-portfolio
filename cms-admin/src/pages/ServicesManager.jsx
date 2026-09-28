import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Trash2, Edit } from 'lucide-react';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', icon: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get('/services');
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching services', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/services/${editingId}`, form);
      } else {
        await API.post('/services', form);
      }
      setForm({ title: '', description: '', icon: '' });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error('Error saving service', err);
    }
  };

  const handleEdit = (s) => {
    setForm({ title: s.title, description: s.description, icon: s.icon || '' });
    setEditingId(s.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await API.delete(`/services/${id}`);
        fetchServices();
      } catch (err) {
        console.error('Error deleting service', err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Services</h2>

      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text" placeholder="Service Title (e.g. Web Development)" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 border rounded" required
        />
        <input
          type="text" placeholder="Icon (e.g. 🌐 or icon name)" value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Description of the service you offer" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border rounded md:col-span-2" rows="3" required
        />
        <div className="md:col-span-2 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
            {editingId ? 'Update Service' : 'Add Service'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', icon: '' }); }} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div key={s.id} className="border p-4 rounded-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {s.icon && <span className="text-2xl">{s.icon}</span>}
                <h3 className="font-bold text-lg">{s.title}</h3>
              </div>
              <p className="text-gray-700 text-sm">{s.description}</p>
            </div>
            <div className="flex justify-end gap-2 border-t pt-3 mt-3">
              <button onClick={() => handleEdit(s)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
