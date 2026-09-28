import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Trash2, Edit } from 'lucide-react';

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', slug: '', content: '', publishedDate: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/blogs/${editingId}`, form);
      } else {
        await API.post('/blogs', form);
      }
      setForm({ title: '', slug: '', content: '', publishedDate: '' });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error('Error saving blog', err);
    }
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, slug: blog.slug, content: blog.content, publishedDate: blog.publishedDate || '' });
    setEditingId(blog.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await API.delete(`/blogs/${id}`);
        fetchBlogs();
      } catch (err) {
        console.error('Error deleting blog', err);
      }
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (value) => {
    const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm({ ...form, title: value, slug });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Blogs</h2>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text" placeholder="Blog Title" value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="p-2 border rounded" required
        />
        <input
          type="text" placeholder="Slug (auto-generated)" value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="p-2 border rounded bg-gray-100" readOnly
        />
        <input
          type="date" placeholder="Published Date" value={form.publishedDate}
          onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
          className="p-2 border rounded md:col-span-2"
        />
        <textarea
          placeholder="Blog Content (Markdown supported)" value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="p-2 border rounded md:col-span-2" rows="6" required
        />
        <div className="md:col-span-2 flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
            {editingId ? 'Update Blog' : 'Publish Blog'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', slug: '', content: '', publishedDate: '' }); }} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Blogs List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{blog.title}</h3>
              <p className="text-xs text-gray-500 mb-1">/{blog.slug} · {blog.publishedDate || 'No date'}</p>
              <p className="text-gray-700 text-sm line-clamp-2">{blog.content}</p>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button onClick={() => handleEdit(blog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
