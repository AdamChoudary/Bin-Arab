'use client';

import { useState } from 'react';
import { addBlog } from '../actions/blogActions';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await addBlog(formData);
      if (result.success) {
        setMessage('Blog added successfully!');
        e.currentTarget.reset();
        setTimeout(() => {
          router.push('/blogs');
        }, 2000);
      }
    } catch (error) {
      setMessage('Error adding blog. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black min-h-screen pt-24 pb-12">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="admin-card bg-dark p-5 rounded-4 border border-gold shadow-lg">
              <h1 className="text-gold mb-4 fw-bold">Admin Dashboard</h1>
              <h2 className="h5 text-light opacity-75 mb-5">Create a New Blog Post</h2>

              {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-12">
                  <label className="form-label text-gold fw-bold">Blog Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    className="form-control bg-black text-white border-secondary focus-gold" 
                    placeholder="Enter blog title" 
                    required 
                  />
                </div>

                <div className="col-12">
                  <label className="form-label text-gold fw-bold">Blog Content</label>
                  <textarea 
                    name="body" 
                    rows={10} 
                    className="form-control bg-black text-white border-secondary focus-gold" 
                    placeholder="Write your blog content here..." 
                    required
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label text-gold fw-bold">Featured Image</label>
                  <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    className="form-control bg-black text-white border-secondary focus-gold" 
                    required 
                  />
                  <div className="form-text text-light opacity-50">Upload a professional image (Recommended: 1200x800px)</div>
                </div>

                <div className="col-12 pt-3">
                  <button 
                    type="submit" 
                    className="btn btn-gold w-100 py-3 fw-bold" 
                    disabled={loading}
                  >
                    {loading ? 'Publishing...' : 'Publish Blog Post'}
                  </button>
                </div>
              </form>

              <div className="mt-5 p-4 bg-black rounded-3 border border-secondary border-dashed">
                <h3 className="h6 text-gold mb-2">🚀 GitHub Sync Tip</h3>
                <p className="small text-light opacity-50 mb-0">
                  New blogs are saved locally to your project. To see them on your live site, remember to <strong>commit and push</strong> the changes to your GitHub repository.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
