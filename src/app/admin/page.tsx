'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { addBlog, updateBlog, deleteBlog, getBlogs } from '../actions/blogActions';
import { getMembers, addMember, deleteMember } from '../actions/memberActions';
import AdminLayout from '@/components/AdminLayout';
import { Blog, Member } from '@/types';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get('view') || 'list';
  const editId = searchParams.get('edit');

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'author'>('title');
  const [wordCount, setWordCount] = useState(0);

  // Derive current blog from editId
  const currentBlog = editId ? blogs.find(b => b.id === parseInt(editId)) : null;

  useEffect(() => {
    fetchData();
  }, []);

  // Update word count when currentBlog changes (for initial edit state)
  useEffect(() => {
    if (currentBlog) {
      const text = currentBlog.content?.replace(/<p>|<\/p>/g, '\n').trim() || '';
      setWordCount(text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
    } else {
      setWordCount(0);
    }
  }, [currentBlog]);

  async function fetchData() {
    setLoading(true);
    try {
      const [blogsData, membersData] = await Promise.all([
        getBlogs(),
        getMembers()
      ]);
      setBlogs(blogsData);
      setMembers(membersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredBlogs = blogs
    .filter(blog => 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.author || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = (a[sortBy] || '').toLowerCase();
      const fieldB = (b[sortBy] || '').toLowerCase();
      return fieldA.localeCompare(fieldB);
    });

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
        await fetchData();
        setTimeout(() => {
          router.push('/admin?view=list');
        }, 1500);
      }
    } catch (error) {
      const err = error as Error;
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleMemberSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    try {
      const result = await addMember(formData);
      if (result.success) {
        setMessage('Member added successfully!');
        await fetchData();
        setTimeout(() => router.push('/admin?view=members'), 1500);
      }
    } catch (error) {
      const err = error as Error;
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this publication? This action cannot be undone.')) return;
    
    setLoading(true);
    try {
      await deleteBlog(id);
      await fetchData();
      setMessage('Publication deleted successfully');
    } catch (error) {
      const err = error as Error;
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteMember(id: number) {
    if (!confirm('Are you sure you want to revoke access for this member?')) return;
    
    setLoading(true);
    try {
      await deleteMember(id);
      await fetchData();
      setMessage('Member access revoked');
    } catch (error) {
      const err = error as Error;
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value.trim();
    setWordCount(text === '' ? 0 : text.split(/\s+/).length);
  };

  if (loading && blogs.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
            <p className="text-gold uppercase tracking-[4px] text-[10px] font-bold animate-pulse">Synchronizing Data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-gold mb-3 text-[32px] font-medium tracking-wide uppercase">
            {view === 'add' ? 'Draft New Insight' : 
             view === 'edit' ? 'Refine Publication' : 
             view === 'members' ? 'Team Governance' :
             view === 'analytics' ? 'Insights Engine' :
             view === 'settings' ? 'Platform Configuration' :
             'Editorial Archive'}
          </h1>
          <p className="text-white/40 text-[10px] tracking-[3px] uppercase font-bold flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
            Bin Arab Admin Dashboard • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}
          </p>
        </div>

        {(view === 'list' || view === 'members') && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search archive..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-gold/10 rounded-2xl px-12 py-4 text-white text-xs w-64 focus:outline-none focus:border-gold/40 focus:bg-white/[0.08] transition-all duration-500 placeholder:text-white/20"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button 
              onClick={() => router.push(view === 'members' ? '/admin?view=add-member' : '/admin?view=add')}
              className="bg-gold text-black px-8 py-4 rounded-2xl text-[10px] tracking-[2px] uppercase font-bold hover:bg-white hover:scale-105 active:scale-95 transition-all duration-500 shadow-xl shadow-gold/5"
            >
              {view === 'members' ? 'Invite Member' : 'New Publication'}
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className={`mb-10 p-6 rounded-2xl border ${
          message.includes('Error') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'
        } animate-fadeInUp shadow-2xl`}>
          <div className="flex items-center gap-4 text-[11px] tracking-[2px] uppercase font-bold">
            <div className={`w-2 h-2 rounded-full ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`} />
            {message}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="admin-card !p-0 overflow-hidden border-gold/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.03] border-b border-gold/10">
                  <th className="px-10 py-6 text-[10px] tracking-[3px] uppercase text-gold font-bold">Publication Detail</th>
                  <th className="px-10 py-6 text-[10px] tracking-[3px] uppercase text-gold font-bold">Author</th>
                  <th className="px-10 py-6 text-[10px] tracking-[3px] uppercase text-gold font-bold text-center">Status</th>
                  <th className="px-10 py-6 text-[10px] tracking-[3px] uppercase text-gold font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-20">
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <p className="italic tracking-[3px] uppercase text-[10px] font-bold">
                          {searchQuery ? `No insights matching "${searchQuery}"` : 'No publications found in the archive'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-white/[0.02] transition-all duration-500 group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border border-gold/10 group-hover:border-gold/40 transition-all duration-700 shadow-2xl">
                            <Image 
                              src={blog.image} 
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                              alt={blog.title} 
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500" />
                          </div>
                          <div>
                            <p className="font-serif text-2xl text-white/90 group-hover:text-gold transition-colors mb-2">{blog.title}</p>
                            <div className="flex items-center gap-4">
                              <p className="text-[9px] text-white/30 uppercase tracking-[2px] font-bold">SLUG: {blog.slug}</p>
                              <span className="w-1 h-1 rounded-full bg-white/10" />
                              <p className="text-[9px] text-gold/40 uppercase tracking-[2px] font-bold">5 MIN READ</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-transparent border border-gold/10 flex items-center justify-center text-[11px] text-gold font-bold shadow-inner">
                            {(blog.author || 'BA').substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-[13px] text-white/80 font-medium tracking-wide">{blog.author || 'Bin Arab'}</p>
                            <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Verified Author</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/5 border border-green-500/10 text-green-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                          <span className="text-[9px] tracking-[2px] uppercase font-bold">Live Insight</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                          <button 
                            onClick={() => router.push(`/admin?view=edit&edit=${blog.id}`)}
                            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/40 transition-all duration-300 hover:scale-105 active:scale-95"
                            title="Edit Publication"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(blog.id)}
                            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-400/40 transition-all duration-300 hover:scale-105 active:scale-95"
                            title="Delete Permanently"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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

      {/* Team Members View */}
      {view === 'members' && (
        <div className="admin-card !p-0 overflow-hidden animate-fadeInUp">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] tracking-[4px] text-white/40 uppercase font-bold">Team Member</th>
                  <th className="px-10 py-6 text-[10px] tracking-[4px] text-white/40 uppercase font-bold text-center">Role</th>
                  <th className="px-10 py-6 text-[10px] tracking-[4px] text-white/40 uppercase font-bold text-center">Status</th>
                  <th className="px-10 py-6 text-[10px] tracking-[4px] text-white/40 uppercase font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-[14px]">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-white font-medium">{member.name}</p>
                          <p className="text-white/30 text-[11px] tracking-wide">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] tracking-[2px] uppercase font-bold border ${
                        member.role === 'Super Admin' ? 'bg-gold/10 border-gold/30 text-gold' : 
                        member.role === 'Editor' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 
                        'bg-white/5 border-white/10 text-white/40'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-white/20'}`} />
                        <span className="text-[10px] tracking-[2px] uppercase font-bold text-white/40">{member.status}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button 
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-[10px] tracking-[2px] uppercase font-bold text-red-400/40 hover:text-red-400 transition-colors"
                      >
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Blog View */}
      {(view === 'add' || view === 'edit') && (
        <div className="admin-card animate-fadeInUp">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <label className="admin-label">Insight Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    required 
                    defaultValue={currentBlog?.title}
                    placeholder="Enter a compelling title..."
                    className="admin-input text-lg md:text-xl font-serif"
                  />
                  <p className="mt-3 text-[9px] text-white/20 uppercase tracking-[2px]">Use professional title casing for maximum impact</p>
                </div>

                <div>
                  <label className="admin-label">Author Identity</label>
                  <input 
                    type="text" 
                    name="author" 
                    defaultValue={currentBlog?.author || 'Bin Arab Editorial'}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="admin-label">Tags (Comma separated)</label>
                  <input 
                    type="text" 
                    name="tags" 
                    defaultValue={currentBlog?.tags?.join(', ')}
                    placeholder="e.g. Luxury, Investment, Islamabad"
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="admin-label">Featured Narrative Image</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      name="image" 
                      accept="image/*"
                      required={!currentBlog}
                      className="admin-input file:mr-6 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-gold file:text-black hover:file:bg-white transition-all cursor-pointer"
                    />
                    {currentBlog && (
                      <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-gold/10 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden relative">
                          <Image src={currentBlog.image} fill className="object-cover" alt="Current" />
                        </div>
                        <p className="text-[10px] text-white/30 uppercase tracking-[2px]">Current asset preserved unless replaced</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="admin-label">Publication Excerpt (SEO Description)</label>
                  <textarea 
                    name="excerpt" 
                    rows={3}
                    defaultValue={currentBlog?.excerpt}
                    placeholder="Write a brief, hooky summary for search engines and social sharing..."
                    className="admin-input resize-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="admin-label !mb-0">Strategic Content</label>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] text-white/20 uppercase tracking-[2px] font-bold">Autosave Active</span>
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gold text-[10px] font-bold tracking-[2px]">
                    {wordCount} WORDS
                  </div>
                </div>
              </div>
              <textarea 
                name="body" 
                required 
                rows={20}
                defaultValue={currentBlog?.content?.replace(/<p>|<\/p>/g, '\n').trim()}
                onChange={handleTextChange}
                placeholder="Unfold the narrative here..."
                className="admin-input font-light leading-relaxed text-lg"
              />
            </div>

            <div>
              <label className="admin-label">Why This Matters (Professional Insight)</label>
              <textarea 
                name="whyMatters" 
                rows={3}
                defaultValue={currentBlog?.whyMatters}
                placeholder="Briefly explain the strategic importance of this piece to the reader..."
                className="admin-input font-light italic"
              />
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-white/5">
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-gold text-black py-5 rounded-2xl text-[11px] tracking-[3px] uppercase font-bold hover:bg-white hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-2xl shadow-gold/10 disabled:opacity-50"
              >
                {loading ? 'Committing Changes...' : currentBlog ? 'Update Publication' : 'Release Publication'}
              </button>
              <button 
                type="button"
                onClick={() => router.push('/admin?view=list')}
                className="px-10 py-5 rounded-2xl border border-white/10 text-white/40 text-[11px] tracking-[3px] uppercase font-bold hover:text-white hover:border-white/40 transition-all duration-500"
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Member View */}
      {view === 'add-member' && (
        <div className="max-w-2xl mx-auto">
          <div className="admin-card animate-fadeInUp">
            <h3 className="text-white text-xl font-medium mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Invite New Team Member
            </h3>
            <form onSubmit={handleMemberSubmit} className="space-y-8">
              <div>
                <label className="admin-label">Full Name</label>
                <input type="text" name="name" required className="admin-input" placeholder="e.g. Alexander Pierce" />
              </div>
              <div>
                <label className="admin-label">Corporate Email</label>
                <input type="email" name="email" required className="admin-input" placeholder="name@binarab.com" />
              </div>
              <div>
                <label className="admin-label">Governance Role</label>
                <select name="role" required className="admin-input appearance-none">
                  <option value="Contributor">Contributor (Draft only)</option>
                  <option value="Editor">Editor (Full editorial access)</option>
                  <option value="Super Admin">Super Admin (Platform governance)</option>
                </select>
              </div>
              <div className="flex items-center gap-6 pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-gold text-black py-5 rounded-2xl text-[11px] tracking-[3px] uppercase font-bold hover:bg-white transition-all duration-500 disabled:opacity-50"
                >
                  {loading ? 'Authorizing...' : 'Grant Access'}
                </button>
                <button 
                  type="button"
                  onClick={() => router.push('/admin?view=members')}
                  className="px-10 py-5 rounded-2xl border border-white/10 text-white/40 text-[11px] tracking-[3px] uppercase font-bold hover:text-white transition-all duration-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Placeholders for other views */}
      {view === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Total Readership', value: '42.8K', growth: '+12.4%' },
            { label: 'Avg. Session Length', value: '04:12', growth: '+8.1%' },
            { label: 'Share Coefficient', value: '1.42', growth: '+22.5%' }
          ].map((stat, i) => (
            <div key={i} className="admin-card border-gold/5 hover:border-gold/20 transition-all duration-500 group">
              <p className="text-[10px] tracking-[3px] uppercase text-white/40 font-bold mb-4">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl text-gold font-serif">{stat.value}</h3>
                <span className="text-[10px] text-green-400 font-bold bg-green-500/5 px-2 py-1 rounded-lg">{stat.growth}</span>
              </div>
              <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gold/40 w-2/3 group-hover:w-full transition-all duration-1000" />
              </div>
            </div>
          ))}
          <div className="md:col-span-3 admin-card min-h-[300px] flex items-center justify-center border-dashed border-white/10">
            <p className="text-[10px] tracking-[4px] uppercase text-white/20 font-bold">Advanced Analytics Engine under maintenance</p>
          </div>
        </div>
      )}

      {view === 'settings' && (
        <div className="max-w-4xl space-y-8">
          <div className="admin-card">
            <h3 className="text-white text-lg font-medium mb-8">Platform Governance</h3>
            <div className="space-y-6">
              {[
                { title: 'Public Comments', desc: 'Allow readers to leave feedback on insights', enabled: false },
                { title: 'Editor Sign-off', desc: 'Require Super Admin approval for all publications', enabled: true },
                { title: 'Social Auto-share', desc: 'Automatically post to linked corporate socials', enabled: false }
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div>
                    <p className="text-sm text-white/80 font-medium mb-1">{setting.title}</p>
                    <p className="text-[11px] text-white/20">{setting.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-all duration-500 cursor-pointer ${setting.enabled ? 'bg-gold' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-500 ${setting.enabled ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
