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
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-white mb-0.5 text-lg font-bold tracking-tight">
            {view === 'add' ? 'Draft Insight' : 
             view === 'edit' ? 'Edit Publication' : 
             view === 'members' ? 'Team' :
             view === 'analytics' ? 'Analytics' :
             view === 'settings' ? 'Settings' :
             'Editorial Archive'}
          </h1>
          <p className="text-white/60 text-[11px] font-medium flex items-center gap-2">
            Bin Arab Luxury Systems • {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>

        {(view === 'list' || view === 'members') && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-gold/20 rounded-md px-4 py-1.5 text-white text-sm w-48 focus:outline-none focus:border-gold transition-all placeholder:text-white/20"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button 
              onClick={() => router.push(view === 'members' ? '/admin?view=add-member' : '/admin?view=add')}
              className="bg-gold text-black px-6 py-1.5 rounded-md text-[13px] font-bold hover:bg-white transition-all shadow-lg shadow-gold/5"
            >
              {view === 'members' ? 'Invite' : 'New Post'}
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className={`mb-8 px-4 py-2 rounded-md border text-[12px] font-bold flex items-center gap-3 animate-fadeInUp ${
          message.includes('Error') ? 'bg-red-500/5 border-red-500/30 text-red-400' : 'bg-green-500/5 border-green-500/30 text-green-400'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`} />
          {message}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="admin-card !p-0 overflow-hidden border-gold/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gold/5 border-b border-gold/10">
                  <th className="px-8 py-4 text-[11px] text-white/60 font-bold uppercase tracking-wider">Publication Detail</th>
                  <th className="px-8 py-4 text-[11px] text-white/60 font-bold uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-[11px] text-white/60 font-bold uppercase tracking-wider text-center">Status</th>
                  <th className="px-8 py-4 text-[11px] text-white/60 font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-10 py-32 text-center">
                      <div className="flex flex-col items-center gap-6 opacity-30">
                        <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center bg-gold/5">
                          <svg className="w-6 h-6 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <div className="space-y-2">
                          <p className="tracking-[4px] uppercase text-[9px] font-bold text-white">No Publications Found</p>
                          <p className="text-[11px] text-white/40 italic">The archive remains silent for this selection</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-white/[0.02] transition-all duration-500 group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border border-gold/10">
                            <Image 
                              src={blog.image} 
                              fill
                              className="object-cover" 
                              alt={blog.title} 
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white mb-0.5">{blog.title}</p>
                            <p className="text-[11px] text-white/40 uppercase tracking-tight">{blog.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-[10px] text-gold font-bold">
                            {(blog.author || 'BA').substring(0, 1).toUpperCase()}
                          </div>
                          <p className="text-[13px] text-white font-medium">{blog.author || 'Bin Arab'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-500">
                          <div className="w-1 h-1 rounded-full bg-green-500" />
                          <span className="text-[10px] font-semibold uppercase">Live</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => router.push(`/admin?view=edit&edit=${blog.id}`)}
                            className="p-1.5 rounded-md hover:bg-gold/10 text-white/60 hover:text-gold transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(blog.id)}
                            className="p-1.5 rounded-md hover:bg-red-500/10 text-white/60 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
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
                <tr className="bg-white/[0.02] border-b border-white/[0.05]">
                  <th className="px-6 py-3 text-[11px] text-white/40 font-semibold uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-[11px] text-white/40 font-semibold uppercase tracking-wider text-center">Role</th>
                  <th className="px-6 py-3 text-[11px] text-white/40 font-semibold uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-3 text-[11px] text-white/40 font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/40 font-medium text-[12px]">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/80">{member.name}</p>
                          <p className="text-[11px] text-white/20 tracking-tight">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase border ${
                        member.role === 'Super Admin' ? 'bg-gold/10 border-gold/20 text-gold' : 
                        member.role === 'Editor' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 
                        'bg-white/5 border-white/10 text-white/40'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-white/10'}`} />
                        <span className="text-[11px] text-white/40">{member.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button 
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-[11px] font-medium text-white/20 hover:text-red-500 transition-colors"
                      >
                        Revoke
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
        <div className="max-w-4xl mx-auto w-full animate-fadeInUp">
          <div className="admin-card !p-0 overflow-hidden border-gold/20">
            <div className="bg-gold/5 border-b border-gold/10 px-10 py-6">
               <h3 className="text-sm text-gold uppercase tracking-[3px] font-bold">Publication Drafting</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                      <div className="mt-4 p-4 rounded-xl bg-white/5 border border-gold/10 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden relative">
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
                className="admin-input font-light leading-relaxed text-base"
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

              <div className="flex items-center gap-3 pt-10 border-t border-gold/10">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gold text-black px-10 py-3 rounded-md text-sm font-bold hover:bg-white transition-all disabled:opacity-50 shadow-lg shadow-gold/10"
                >
                  {loading ? 'Processing...' : currentBlog ? 'Commit Update' : 'Publish Insight'}
                </button>
                <button 
                  type="button"
                  onClick={() => router.push('/admin?view=list')}
                  className="px-8 py-3 rounded-md border border-gold/20 text-white/60 text-sm font-bold hover:text-white hover:bg-white/5 transition-all"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
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
                  className="flex-1 bg-gold text-black py-5 rounded-full text-[11px] tracking-[3px] uppercase font-bold hover:bg-white transition-all duration-500 disabled:opacity-50"
                >
                  {loading ? 'Authorizing...' : 'Grant Access'}
                </button>
                <button 
                  type="button"
                  onClick={() => router.push('/admin?view=members')}
                  className="px-10 py-5 rounded-full border border-white/10 text-white/40 text-[11px] tracking-[3px] uppercase font-bold hover:text-white transition-all duration-500"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Readership', value: '42.8K', growth: '+12%' },
            { label: 'Avg. Session', value: '04:12', growth: '+8%' },
            { label: 'Coefficient', value: '1.42', growth: '+22%' }
          ].map((stat, i) => (
            <div key={i} className="admin-card border-gold/15 hover:border-gold/30 transition-colors">
              <p className="text-[11px] font-bold text-white/50 mb-4">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl text-white font-bold tracking-tight">{stat.value}</h3>
                <span className="text-[10px] text-green-500 font-bold">{stat.growth}</span>
              </div>
            </div>
          ))}
          <div className="md:col-span-3 admin-card min-h-[200px] flex items-center justify-center border-dashed border-gold/10">
            <p className="text-[11px] text-white/40 font-bold">Analytics Engine Synchronizing...</p>
          </div>
        </div>
      )}

      {view === 'settings' && (
        <div className="max-w-2xl mx-auto w-full animate-fadeInUp">
          <div className="admin-card border-gold/20">
            <h3 className="text-white text-sm font-bold mb-8 flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-gold" />
              Platform Configuration
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Public Feedback', desc: 'Enable reader comments on publications', enabled: false },
                { title: 'Strict Editorial', desc: 'Require Master approval for all drafts', enabled: true },
                { title: 'Auto-Archive', desc: 'Archive publications after 12 months', enabled: false }
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md bg-gold/5 border border-gold/10">
                  <div>
                    <p className="text-[13px] text-white font-bold mb-0.5">{setting.title}</p>
                    <p className="text-[11px] text-white/40 font-medium">{setting.desc}</p>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative transition-colors duration-200 cursor-pointer ${setting.enabled ? 'bg-gold' : 'bg-white/10'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-200 ${setting.enabled ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
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
