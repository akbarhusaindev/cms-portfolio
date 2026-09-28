import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Trash2, Edit } from 'lucide-react';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ clientName: '', feedback: '', designation: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await API.get('/testimonials');
      setTestimonials(res.data);
    } catch (err) {
      console.error('Error fetching testimonials', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/testimonials/${editingId}`, form);
      } else {
        await API.post('/testimonials', form);
      }
      setForm({ clientName: '', feedback: '', designation: '' });
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      console.error('Error saving testimonial', err);
    }
  };

  const handleEdit = (t) => {
    setForm({ clientName: t.clientName, feedback: t.feedback, designation: t.designation });
    setEditingId(t.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await API.delete(`/testimonials/${id}`);
        fetchTestimonials();
      } catch (err) {
        console.error('Error deleting testimonial', err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>

      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text" placeholder="Client Name" value={form.clientName}
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          className="p-2 border rounded" required
        />
        <input
          type="text" placeholder="Designation (e.g. CEO at TechCo)" value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Client feedback / testimonial text" value={form.feedback}
          onChange={(e) => setForm({ ...form, feedback: e.target.value })}
          className="p-2 border rounded md:col-span-2" rows="3" required
        />
        <div className="md:col-span-2 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
            {editingId ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ clientName: '', feedback: '', designation: '' }); }} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{t.clientName}</h3>
              {t.designation && <p className="text-sm text-blue-600">{t.designation}</p>}
              <p className="text-gray-700 text-sm mt-1 italic">"{t.feedback}"</p>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button onClick={() => handleEdit(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
