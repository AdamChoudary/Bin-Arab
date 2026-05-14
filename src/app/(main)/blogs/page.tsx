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
          <div className="text-center mb-16">
            <h1 className="text-gold mb-4 text-[32px] md:text-[38px] tracking-[3px] uppercase font-medium">Editorial Insights</h1>
            <div className="w-20 h-0.5 bg-gold mx-auto mb-6"></div>
            <p className="text-white/50 max-w-2xl mx-auto text-sm tracking-[1px] font-light">
              Stay updated with the latest trends, investment opportunities, and property news in Islamabad and Rawalpindi.
            </p>
          </div>

          {featuredBlog && (
            <div className="mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0">
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] overflow-hidden group">
                    <Image 
                      src={featuredBlog.image} 
                      alt={featuredBlog.title} 
                      fill
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  </div>
                </div>
                <div className="lg:col-span-5 lg:-ml-12 z-10 bg-black/40 backdrop-blur-md border border-gold/10 p-8 md:p-12">
                  <div className="text-gold mb-4 uppercase text-[10px] tracking-[3px] font-medium opacity-60">Featured Story</div>
                  <h2 className="text-white mb-6 text-[24px] md:text-[30px] font-medium tracking-wide leading-tight">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-white/60 mb-8 text-sm leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>
                  <Link href={`/blogs/${featuredBlog.slug}`} className="inline-block border-b border-gold text-gold pb-1 text-[11px] tracking-[3px] font-medium uppercase transition-all hover:text-white hover:border-white">
                    Read Publication
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {otherBlogs.map((blog: Blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all"></div>
                </div>
                <div className="text-gold/60 mb-2 uppercase text-[9px] tracking-[2px] font-medium">{blog.date}</div>
                <h3 className="text-white group-hover:text-gold transition-colors text-[18px] md:text-[20px] font-medium mb-3 leading-snug">
                  {blog.title}
                </h3>
                <p className="text-white/50 text-[13px] leading-relaxed line-clamp-2 mb-4 font-light">
                  {blog.excerpt}
                </p>
                <span className="text-[10px] tracking-[2px] uppercase border-b border-gold/30 pb-1 text-gold group-hover:text-white group-hover:border-white transition-all">Explore Insight</span>
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
