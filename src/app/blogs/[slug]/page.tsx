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
    <div className="bg-black min-h-screen pt-32 pb-20">
      <ReadingProgress />
      
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/" className="text-gold text-decoration-none small letter-spacing-1">HOME</Link></li>
            <li className="breadcrumb-item"><Link href="/blogs" className="text-gold text-decoration-none small letter-spacing-1">EDITORIAL</Link></li>
            <li className="breadcrumb-item active text-light opacity-50 small letter-spacing-1" aria-current="page">{blog.title.toUpperCase()}</li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Left Column: Content */}
          <div className="col-lg-7">
            <h1 className="text-white display-4 fw-bold mb-4 lh-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              {blog.title}
            </h1>
            
            <div className="d-flex align-items-center mb-5 text-gold small letter-spacing-2 fw-bold opacity-75 border-top border-bottom border-gold border-opacity-10 py-3">
              <div className="me-4">
                PUBLISHED: {blog.date}
              </div>
              <div>
                BY: BIN ARAB EDITORIAL
              </div>
            </div>

            <div className="blog-content">
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            <div className="mt-5 pt-5 border-top border-gold border-opacity-10">
              <h4 className="text-gold mb-4 small letter-spacing-2 fw-bold">SHARE THIS INSIGHT</h4>
              <div className="d-flex gap-3">
                <button className="btn btn-gold-outline rounded-0 px-4 py-2">FACEBOOK</button>
                <button className="btn btn-gold-outline rounded-0 px-4 py-2">TWITTER</button>
                <button className="btn btn-gold-outline rounded-0 px-4 py-2">WHATSAPP</button>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Image & Sidebar */}
          <div className="col-lg-5">
            <div className="sticky-top" style={{ top: '120px' }}>
              <div className="position-relative mb-4">
                <img src={blog.image} alt={blog.title} className="w-100 rounded-0 shadow-2xl" style={{ maxHeight: '700px', objectFit: 'cover' }} />
                <div className="position-absolute top-0 start-0 w-100 h-100 border border-gold border-opacity-20 pointer-events-none" style={{ transform: 'translate(10px, 10px)', zIndex: -1 }}></div>
              </div>
              
              <div className="p-4 bg-dark bg-opacity-50 border border-gold border-opacity-10 mt-5">
                <h5 className="text-gold mb-3 small letter-spacing-2 fw-bold">WHY THIS MATTERS</h5>
                <p className="text-light opacity-60 small lh-relaxed mb-0">
                  This editorial piece explores the critical intersections of luxury living and strategic investment in the heart of Islamabad's most prestigious developments.
                </p>
              </div>
              
              <Link href="/blogs" className="d-block mt-5 text-gold text-decoration-none small letter-spacing-2 fw-bold hover:translate-x-2 transition-transform">
                ← BACK TO ALL EDITORIALS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
