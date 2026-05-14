'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

import { Blog } from '@/types';

const BLOGS_FILE = path.join(process.cwd(), 'src/data/blogs.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public/uploads');

// Helper to ensure directory exists
async function ensureDir(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Helper to read blogs
async function readBlogs(): Promise<Blog[]> {
  try {
    // Ensure the data directory exists
    const dataDir = path.dirname(BLOGS_FILE);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
      await fs.writeFile(BLOGS_FILE, '[]');
      return [];
    }

    const data = await fs.readFile(BLOGS_FILE, 'utf-8');
    if (!data || data.trim() === '') return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

// Helper to write blogs
async function writeBlogs(blogs: Blog[]) {
  await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2));
}

export async function addBlog(formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const imageFile = formData.get('image') as File;
  const author = formData.get('author') as string || 'Bin Arab Editorial';
  const whyMatters = formData.get('whyMatters') as string;
  const excerpt = formData.get('excerpt') as string;
  const tags = (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(Boolean);

  if (!title || !body || !imageFile) {
    throw new Error('Missing required fields');
  }

  await ensureDir(UPLOADS_DIR);

  // Save image
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(UPLOADS_DIR, fileName);
  await fs.writeFile(filePath, buffer);

  const imageUrl = `/uploads/${fileName}`;

  const blogs = await readBlogs();

  // Calculate reading time (avg 200 words per minute)
  const wordCount = body.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  const newBlog: Blog = {
    id: Date.now(),
    title,
    excerpt: excerpt || body.substring(0, 150) + '...',
    content: body.split('\n').map(p => `<p>${p.trim()}</p>`).join(''),
    image: imageUrl,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    author,
    whyMatters,
    tags,
    readTime: `${readTime} MIN READ`,
    stats: {
      views: 0,
      shares: 0
    },
    publishedAt: new Date().toISOString(),
    lastUpdatedBy: 'Bin Arab Admin'
  };

  blogs.unshift(newBlog);
  await writeBlogs(blogs);

  revalidatePath('/blogs');
  revalidatePath('/');
  
  return { success: true, slug: newBlog.slug };
}

export async function updateBlog(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const imageFile = formData.get('image') as File;
  const author = formData.get('author') as string;
  const whyMatters = formData.get('whyMatters') as string;
  const excerpt = formData.get('excerpt') as string;
  const tags = (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(Boolean);

  const blogs = await readBlogs();
  const index = blogs.findIndex((b) => b.id === id);

  if (index === -1) {
    throw new Error('Blog not found');
  }

  let imageUrl = blogs[index].image;

  // Handle image update if a new file is provided
  if (imageFile && imageFile.size > 0) {
    await ensureDir(UPLOADS_DIR);
    
    // Optional: Delete old image if it's in /uploads/
    if (blogs[index].image.startsWith('/uploads/')) {
      const oldPath = path.join(process.cwd(), 'public', blogs[index].image);
      try { await fs.unlink(oldPath); } catch { /* ignore */ }
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(UPLOADS_DIR, fileName);
    await fs.writeFile(filePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  blogs[index] = {
    ...blogs[index],
    title,
    excerpt: excerpt || body.substring(0, 150) + '...',
    content: body.includes('<p>') ? body : body.split('\n').map(p => `<p>${p.trim()}</p>`).join(''),
    image: imageUrl,
    author: author || blogs[index].author,
    whyMatters: whyMatters || blogs[index].whyMatters,
    tags: tags.length > 0 ? tags : blogs[index].tags
  };

  await writeBlogs(blogs);

  revalidatePath('/blogs');
  revalidatePath(`/blogs/${blogs[index].slug}`);
  revalidatePath('/');
  
  return { success: true };
}

export async function deleteBlog(id: number) {
  const blogs = await readBlogs();
  const blogToDelete = blogs.find((b) => b.id === id);

  if (!blogToDelete) {
    throw new Error('Blog not found');
  }

  // Delete associated image
  if (blogToDelete.image.startsWith('/uploads/')) {
    const filePath = path.join(process.cwd(), 'public', blogToDelete.image);
    try { await fs.unlink(filePath); } catch { /* ignore */ }
  }

  const updatedBlogs = blogs.filter((b) => b.id !== id);
  await writeBlogs(updatedBlogs);

  revalidatePath('/blogs');
  revalidatePath('/');
  
  return { success: true };
}

export async function getBlogs(): Promise<Blog[]> {
  return await readBlogs();
}
