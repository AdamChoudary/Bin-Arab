import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import ReadingProgress from '@/components/ReadingProgress';

async function getBlog(slug: string) {
  const filePath = path.join(process.cwd(), 'src/data/blogs.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const blogs = JSON.parse(data);
    return blogs.find((b: any) => b.slug === slug);
  } catch (error) {
    console.error('Error reading blog:', error);
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen text-white font-poppins">
      <ReadingProgress />
      
      <div className="container mx-auto px-4 pt-32 md:pt-40 pb-24">
        <nav aria-label="breadcrumb" className="mb-12">
          <ol className="flex items-center gap-4 text-[10px] tracking-[2px] uppercase list-none p-0 m-0">
            <li><Link href="/" className="text-gold hover:text-white transition-colors">HOME</Link></li>
            <li className="text-white/20">/</li>
            <li><Link href="/blogs" className="text-gold hover:text-white transition-colors">EDITORIAL</Link></li>
            <li className="text-white/20">/</li>
            <li className="text-white/40 truncate max-w-[200px]" aria-current="page">{blog.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Content */}
          <div className="lg:col-span-7">
            <h1 className="text-white mb-8 text-[32px] md:text-[36px] font-medium tracking-wide leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center mb-10 text-gold uppercase text-[10px] tracking-[3px] font-medium opacity-60 border-y border-gold/10 py-4">
              <div className="mr-8">
                PUBLISHED: {blog.date}
              </div>
              <div>
                BY: BIN ARAB EDITORIAL
              </div>
            </div>

            <div className="blog-content text-white/80 leading-[1.9] font-light text-[17px]">
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            <div className="mt-16 pt-10 border-t border-gold/10">
              <h4 className="text-gold mb-6 uppercase text-[11px] tracking-[3px] font-medium opacity-60">Share This Insight</h4>
              <div className="flex flex-wrap gap-4">
                {['FACEBOOK', 'TWITTER', 'WHATSAPP'].map((platform) => (
                  <button key={platform} className="border border-gold text-gold px-6 py-2 rounded-none text-[10px] tracking-[2px] font-medium transition-all duration-300 hover:bg-gold hover:text-black">
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Featured Image & Sidebar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-40">
              <div className="relative mb-12">
                <img src={blog.image} alt={blog.title} className="w-full h-auto max-h-[700px] object-cover brightness-90 grayscale-[10%]" />
                <div className="absolute top-0 left-0 w-full h-full border border-gold/10 pointer-events-none -z-10 translate-x-4 translate-y-4 hidden md:block"></div>
              </div>
              
              <div className="p-8 md:p-10 bg-white/5 border border-gold/10">
                <h5 className="text-gold mb-4 uppercase text-[11px] tracking-[3px] font-medium opacity-60">Why This Matters</h5>
                <p className="text-white/50 leading-relaxed text-[14px] font-light italic">
                  This editorial piece explores the critical intersections of luxury living and strategic investment in the heart of Islamabad's most prestigious developments.
                </p>
              </div>
              
              <Link href="/blogs" className="group flex items-center mt-10 text-gold text-[11px] tracking-[3px] font-medium uppercase transition-all">
                <span className="transition-transform duration-300 group-hover:-translate-x-2 mr-2">←</span> BACK TO ALL EDITORIALS
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
