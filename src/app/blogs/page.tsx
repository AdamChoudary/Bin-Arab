import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

async function getBlogs() {
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
            <div className="grid grid-cols-1 lg:grid-cols-12 mb-16 golden-card bg-white/5 group overflow-hidden">
              <div className="lg:col-span-7 h-full overflow-hidden">
                <img 
                  src={featuredBlog.image} 
                  alt={featuredBlog.title} 
                  className="w-full h-full min-h-[400px] object-cover transition-all duration-1000 ease-cinematic group-hover:scale-105 brightness-75 grayscale-[20%] group-hover:brightness-90 group-hover:grayscale-0"
                />
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                <div className="text-gold mb-4 uppercase text-[11px] tracking-[3px] font-medium opacity-60">
                  {featuredBlog.date} • Featured Insight
                </div>
                <h2 className="text-gold mb-6 text-[24px] md:text-[28px] font-medium tracking-wide leading-tight">
                  {featuredBlog.title}
                </h2>
                <p className="text-white/50 mb-10 text-[15px] leading-[1.8] font-light">
                  {featuredBlog.excerpt}
                </p>
                <Link 
                  href={`/blogs/${featuredBlog.slug}`} 
                  className="inline-block bg-gold text-black py-3 px-8 text-center uppercase tracking-[2px] font-medium text-[11px] transition-all duration-300 hover:bg-gold-hover self-start"
                >
                  Read Full Insight
                </Link>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {otherBlogs.map((blog: any) => (
              <div className="group flex flex-col bg-white/5 golden-card transition-all duration-600 ease-cinematic hover:-translate-y-2 hover:border-gold" key={blog.id}>
                <div className="relative overflow-hidden h-[280px]">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-all duration-1000 ease-cinematic group-hover:scale-110 brightness-75 grayscale-[20%] group-hover:brightness-90 group-hover:grayscale-0" 
                  />
                  <div className="absolute bottom-0 left-0 bg-gold text-black px-4 py-2 text-[10px] font-semibold tracking-[2px]">
                    {blog.date}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-gold mb-4 text-[18px] font-medium tracking-wide leading-snug">{blog.title}</h3>
                  <p className="text-white/50 mb-8 text-[14px] leading-[1.7] font-light line-clamp-3">{blog.excerpt}</p>
                  <Link 
                    href={`/blogs/${blog.slug}`} 
                    className="mt-auto w-full border border-gold text-gold py-3 text-center uppercase tracking-[2px] font-medium text-[10px] transition-all duration-300 hover:bg-gold hover:text-black"
                  >
                    View Details
                  </Link>
                </div>
              </div>
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
