'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { addBlog, updateBlog, deleteBlog, getBlogs } from '../actions/blogActions';
import AdminLayout from '@/components/AdminLayout';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get('view') || 'list';
  const editId = searchParams.get('edit');

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [currentBlog, setCurrentBlog] = useState<any>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (editId && blogs.length > 0) {
      const blog = blogs.find((b: any) => b.id === parseInt(editId));
      if (blog) {
        setCurrentBlog(blog);
      }
    } else {
      setCurrentBlog(null);
    }
  }, [editId, blogs]);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    
    try {
      let result;
      if (currentBlog) {
        result = await updateBlog(currentBlog.id, formData);
        setMessage('Blog updated successfully!');
      } else {
        result = await addBlog(formData);
        setMessage('Blog published successfully!');
      }

      if (result.success) {
        await fetchBlogs();
        setTimeout(() => {
          router.push('/admin?view=list');
        }, 1500);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      setLoading(true);
      try {
        await deleteBlog(id);
        await fetchBlogs();
        setMessage('Blog deleted successfully.');
      } catch (error) {
        setMessage('Error deleting blog.');
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <AdminLayout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-2">
            {view === 'create' ? 'Create Insight' : view === 'edit' ? 'Edit Insight' : 'Editorial Overview'}
          </h2>
          <p className="text-white/40 tracking-[3px] text-[10px] uppercase">
            {view === 'list' ? 'Managing your digital presence' : 'Crafting high-end editorial content'}
          </p>
        </div>
        
        {view === 'list' && (
          <button 
            onClick={() => router.push('/admin?view=create')}
            className="brand-button !py-4 !px-10 shadow-[0_10px_20px_rgba(196,164,90,0.1)]"
          >
            NEW PUBLICATION
          </button>
        )}
      </div>

      {message && (
        <div className={`mb-8 p-4 rounded-xl border ${message.includes('Error') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'} animate-fadeInUp`}>
          <p className="text-sm font-medium flex items-center gap-2">
            {message.includes('Error') ? '⚠️' : '✅'} {message}
          </p>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="admin-card !p-0 overflow-hidden border-gold/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-gold/10">
                  <th className="px-8 py-5 text-[10px] tracking-[2px] uppercase text-gold/60 font-bold">Publication</th>
                  <th className="px-8 py-5 text-[10px] tracking-[2px] uppercase text-gold/60 font-bold">Author</th>
                  <th className="px-8 py-5 text-[10px] tracking-[2px] uppercase text-gold/60 font-bold">Date</th>
                  <th className="px-8 py-5 text-[10px] tracking-[2px] uppercase text-gold/60 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-white/20 italic tracking-widest uppercase text-xs">
                      No publications found. Create your first one.
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={blog.image} className="w-12 h-12 rounded object-cover border border-gold/20" alt="" />
                          <div>
                            <p className="font-medium text-white/90 group-hover:text-gold transition-colors">{blog.title}</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-wider">SLUG: {blog.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-white/60 font-light">{blog.author || 'Bin Arab'}</td>
                      <td className="px-8 py-6 text-sm text-white/60 font-light">{blog.date}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => router.push(`/admin?view=edit&edit=${blog.id}`)}
                            className="p-2 text-white/40 hover:text-gold transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(blog.id)}
                            className="p-2 text-white/40 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor View */}
      {(view === 'create' || view === 'edit') && (
        <form onSubmit={handleSubmit} className="space-y-12 animate-fadeInUp">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="admin-card">
                <h3 className="text-gold text-xs tracking-[4px] uppercase font-bold mb-8">Content Foundation</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-3 font-bold">Publication Title</label>
                    <input 
                      type="text" 
                      name="title" 
                      defaultValue={currentBlog?.title || ''}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus-gold font-serif text-xl" 
                      placeholder="e.g. The Future of Luxury Living in Bahria Enclave"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-3 font-bold">Editorial Content</label>
                    <textarea 
                      name="body" 
                      rows={15} 
                      defaultValue={currentBlog?.content?.replace(/<p>|<\/p>/g, '\n').trim() || ''}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus-gold leading-relaxed font-light" 
                      placeholder="Share the deep insights here..."
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="text-gold text-xs tracking-[4px] uppercase font-bold mb-8">Additional Context</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-3 font-bold">Brief Excerpt (Summary)</label>
                    <textarea 
                      name="excerpt" 
                      rows={3} 
                      defaultValue={currentBlog?.excerpt || ''}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus-gold font-light text-sm" 
                      placeholder="A short summary for the list page..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-3 font-bold">Why This Matters (Sidebar Content)</label>
                    <textarea 
                      name="whyMatters" 
                      rows={4} 
                      defaultValue={currentBlog?.whyMatters || ''}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus-gold italic font-light text-sm" 
                      placeholder="Briefly explain the importance of this insight..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              <div className="admin-card">
                <h3 className="text-gold text-xs tracking-[4px] uppercase font-bold mb-8">Metadata & Identity</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-3 font-bold">Featured Imagery</label>
                    <div className="relative group cursor-pointer">
                      <input 
                        type="file" 
                        name="image" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        required={!currentBlog}
                      />
                      <div className="border-2 border-dashed border-gold/20 rounded-xl p-8 text-center group-hover:border-gold/40 transition-colors">
                        {currentBlog?.image && !loading ? (
                          <img src={currentBlog.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-4 opacity-50" />
                        ) : (
                          <div className="text-3xl mb-2 opacity-30">🖼️</div>
                        )}
                        <p className="text-[10px] tracking-[2px] text-white/40 uppercase">Click to upload new image</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-3 font-bold">Author Name</label>
                    <input 
                      type="text" 
                      name="author" 
                      defaultValue={currentBlog?.author || 'Bin Arab Editorial'}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus-gold text-sm" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-3 font-bold">Tags (Comma Separated)</label>
                    <input 
                      type="text" 
                      name="tags" 
                      defaultValue={currentBlog?.tags?.join(', ') || ''}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-3 text-white focus-gold text-sm" 
                      placeholder="Luxury, Investment, Bahria"
                    />
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit" 
                      className="brand-button w-full !py-5 shadow-lg flex items-center justify-center gap-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        view === 'edit' ? 'UPDATE PUBLICATION' : 'PUBLISH INSIGHT'
                      )}
                    </button>
                    <button 
                      type="button"
                      onClick={() => router.push('/admin?view=list')}
                      className="w-full mt-4 text-[10px] tracking-[3px] text-white/30 hover:text-white uppercase transition-colors"
                    >
                      Discard Changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gold/5 border border-gold/10 rounded-2xl p-8">
                <h4 className="text-gold text-[10px] tracking-[3px] uppercase font-bold mb-3 flex items-center gap-2">
                  <span className="text-lg">💡</span> Pro Tip
                </h4>
                <p className="text-[12px] text-white/50 leading-relaxed font-light">
                  Use high-resolution imagery (1200x800px) to maintain the editorial standard. Your publications reflect the Bin Arab commitment to excellence.
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
