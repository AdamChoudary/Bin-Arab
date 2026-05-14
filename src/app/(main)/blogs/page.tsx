import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { Blog } from '@/types';

async function getBlogs(): Promise<Blog[]> {
  const filePath = path.join(process.cwd(), 'src/data/blogs.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="bg-black min-h-screen text-white font-poppins">
      
      <div className="pt-32 md:pt-40 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h1 className="text-gold mb-6 text-[36px] md:text-[48px] font-serif font-bold tracking-tight">Bin Arab Journal</h1>
            <p className="text-white max-w-2xl mx-auto text-sm tracking-[2px] font-bold uppercase opacity-60">
              Curated perspectives on luxury living and strategic investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
            {blogs.map((blog: Blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-md">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="text-gold mb-3 text-[10px] tracking-[3px] font-bold">{blog.date}</div>
                <h3 className="text-white group-hover:text-gold transition-colors text-[22px] md:text-[26px] font-serif font-bold mb-4 leading-tight">
                  {blog.title}
                </h3>
                <p className="text-white text-[15px] leading-relaxed line-clamp-2 mb-6 font-medium opacity-60">
                  {blog.excerpt}
                </p>
                <span className="text-[10px] tracking-[4px] font-bold uppercase border-b border-gold/30 pb-1 text-gold group-hover:text-white group-hover:border-white transition-all">Explore Detail</span>
              </Link>
            ))}
            
            {blogs.length === 0 && (
              <div className="col-span-full text-center py-24 border border-gold/10">
                <h3 className="text-white/30 font-light tracking-[2px] text-lg uppercase">No editorial insights found.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
