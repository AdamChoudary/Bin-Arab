import Link from 'next/link';
import { cache } from 'react';
import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReadingProgress from '@/components/ReadingProgress';
import { Blog } from '@/types';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { articleLd, breadcrumbLd } from '@/lib/structuredData';

const getBlogs = cache(async (): Promise<Blog[]> => {
  const filePath = path.join(process.cwd(), 'src/data/blogs.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
});

const getBlog = cache(async (slug: string): Promise<Blog | null> => {
  const blogs = await getBlogs();
  return blogs.find((b) => b.slug === slug) || null;
});

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return buildMetadata({ title: 'Insight Not Found', path: `/blogs/${slug}`, noIndex: true });
  }

  return buildMetadata({
    title: blog.title,
    description: blog.excerpt || `${blog.title} — insights from the Bin Arab Real Estate journal.`,
    path: `/blogs/${blog.slug}`,
    image: blog.image,
    type: 'article',
    publishedTime: blog.publishedAt,
    authors: blog.author ? [blog.author] : undefined,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/blogs' },
            { name: blog.title, path: `/blogs/${blog.slug}` },
          ]),
          articleLd(blog),
        ]}
      />
      <ReadingProgress />
      
      <div className="max-w-[1200px] mx-auto px-6 pt-32 md:pt-48 pb-24">
        {/* Simple Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-16">
          <ol className="flex items-center gap-4 text-[10px] tracking-[4px] font-bold list-none p-0 m-0 opacity-40">
            <li><Link href="/blogs" className="hover:text-gold transition-colors">JOURNAL</Link></li>
            <li>/</li>
            <li className="text-white truncate" aria-current="page">INSIGHT</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Content */}
          <div className="lg:col-span-7">
            <article className="animate-fadeInUp">
              <div className="flex items-center gap-4 text-gold mb-8 text-[11px] tracking-[4px] font-bold">
                <span>{blog.date}</span>
                <span className="w-1 h-1 rounded-full bg-gold/30" />
                <span>{blog.author || 'BIN ARAB'}</span>
              </div>

              <h1 className="text-white mb-12 text-[32px] md:text-[44px] font-serif font-bold tracking-tight leading-[1.1]">
                {blog.title}
              </h1>

              <div className="blog-content text-white leading-[1.8] font-normal text-[18px] mb-16">
                <div 
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  className="prose prose-invert prose-gold max-w-none"
                />
              </div>

              {/* Perspective Section - Simple & Integrated */}
              <div className="py-10 border-y border-gold/10 mb-12">
                <h4 className="text-gold mb-6 text-[11px] tracking-[4px] font-bold">THE PERSPECTIVE</h4>
                <p className="text-white text-[16px] font-medium italic leading-relaxed opacity-80">
                  {blog.whyMatters || "This editorial piece explores the critical intersections of luxury living and strategic investment in the heart of Islamabad's most prestigious developments."}
                </p>
              </div>
              
              <Link href="/blogs" className="group flex items-center text-white text-[11px] tracking-[4px] font-bold transition-all border-b border-white/10 pb-2 w-fit">
                <span className="transition-transform duration-300 group-hover:-translate-x-2 mr-4">←</span> RETURN TO JOURNAL
              </Link>
            </article>
          </div>

          {/* Right Column: Featured Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-48">
            <div className="relative w-full aspect-[4/5] rounded-md overflow-hidden shadow-2xl">
              <Image 
                src={blog.image} 
                alt={blog.title} 
                fill 
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover" 
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
