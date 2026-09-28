import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Save, UploadCloud, Loader2 } from 'lucide-react';

export default function AboutManager() {
  const [form, setForm] = useState({ bio: '', resumeUrl: '', profileImage: '', email: '', phone: '' });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await API.get('/about');
      if (res.data && res.data.id) {
        setForm({
          bio: res.data.bio || '',
          resumeUrl: res.data.resumeUrl || '',
          profileImage: res.data.profileImage || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
        });
      }
    } catch (err) {
      console.error('Error fetching about', err);
    } finally {
      setLoading(false);
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

      setForm((prev) => ({ ...prev, profileImage: finalUrl }));
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
      await API.post('/about', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving about', err);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading profile data...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage About / Profile</h2>

      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio / About Me</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full p-3 border rounded-lg bg-white" rows="5"
            placeholder="Tell the world about yourself..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2.5 border rounded-lg bg-white" placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2.5 border rounded-lg bg-white" placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume URL</label>
          <input
            type="text" value={form.resumeUrl}
            onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
            className="w-full p-2.5 border rounded-lg bg-white" placeholder="https://drive.google.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (Cloudinary Upload)</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm font-medium text-gray-700 shadow-sm transition">
              {uploading ? <Loader2 className="animate-spin" size={16} /> : <UploadCloud size={16} />}
              <span>{uploading ? 'Uploading to Cloudinary...' : 'Upload New Photo'}</span>
              <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" disabled={uploading} />
            </label>
            <input
              type="text"
              placeholder="Or paste direct image URL"
              value={form.profileImage || ''}
              onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
              className="p-2 border rounded-lg flex-1 text-sm bg-white"
            />
          </div>

          {form.profileImage && (
            <div className="mt-3 flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200 w-fit">
              <img src={form.profileImage} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover border-2 border-blue-400 shadow-sm" />
              <div className="text-xs">
                {uploadSuccess && <p className="text-green-600 font-semibold mb-0.5">✓ Uploaded to Cloudinary successfully!</p>}
                <p className="text-gray-500 truncate max-w-xs font-mono">{form.profileImage}</p>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, profileImage: '' }))}
                  className="text-red-500 hover:text-red-700 mt-1"
                >
                  Remove Photo
                </button>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-500 transition font-medium shadow-sm flex items-center gap-2">
          <Save size={18} /> Save About Info
        </button>

        {saved && <p className="text-green-600 text-sm font-medium">✓ About info saved successfully!</p>}
      </form>
    </div>
  );
}
