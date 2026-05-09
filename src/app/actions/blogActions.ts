'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const BLOGS_FILE = path.join(process.cwd(), 'src/data/blogs.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public/uploads');

export async function addBlog(formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const imageFile = formData.get('image') as File;

  if (!title || !body || !imageFile) {
    throw new Error('Missing required fields');
  }

  // Ensure uploads directory exists
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  }

  // Save image
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(UPLOADS_DIR, fileName);
  await fs.writeFile(filePath, buffer);

  const imageUrl = `/uploads/${fileName}`;

  // Update JSON
  const blogsData = await fs.readFile(BLOGS_FILE, 'utf-8');
  const blogs = JSON.parse(blogsData);

  const newBlog = {
    id: Date.now(),
    title,
    excerpt: body.substring(0, 150) + '...',
    content: body.split('\n').map(p => `<p>${p}</p>`).join(''),
    image: imageUrl,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
  };

  blogs.unshift(newBlog);
  await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2));

  revalidatePath('/blogs');
  revalidatePath('/');
  
  return { success: true, slug: newBlog.slug };
}
