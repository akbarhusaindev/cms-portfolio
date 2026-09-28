import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Trash2, Mail } from 'lucide-react';

export default function MessagesViewer() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await API.get('/contact');
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Mail className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">{messages.length}</span>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages received yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 hover:underline">{msg.email}</a>
                </div>
                <span className="text-xs text-gray-400">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'No date'}
                </span>
              </div>
              <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded mt-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
