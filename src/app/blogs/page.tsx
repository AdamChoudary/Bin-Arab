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
    <div className="bg-black min-h-screen pt-32 pb-20">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h1 className="text-gold display-4 fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Our Insights & News</h1>
          <div className="gold-divider mx-auto"></div>
          <p className="text-light opacity-75 max-w-2xl mx-auto">Stay updated with the latest trends, investment opportunities, and property news in Islamabad and Rawalpindi.</p>
        </div>

        {featuredBlog && (
          <div className="row mb-5 g-0 rounded-4 overflow-hidden border border-gold border-opacity-10 bg-dark bg-opacity-50">
            <div className="col-lg-7">
              <div className="h-100 overflow-hidden">
                <img 
                  src={featuredBlog.image} 
                  alt={featuredBlog.title} 
                  className="w-100 h-100 object-fit-cover transition-transform duration-700 hover:scale-105"
                  style={{ minHeight: '400px' }}
                />
              </div>
            </div>
            <div className="col-lg-5 p-5 d-flex flex-column justify-content-center">
              <div className="text-gold small mb-3 letter-spacing-2 text-uppercase fw-bold opacity-75">
                {featuredBlog.date} • Featured Post
              </div>
              <h2 className="display-6 text-white mb-4 lh-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                {featuredBlog.title}
              </h2>
              <p className="text-light opacity-75 mb-5 fs-5">
                {featuredBlog.excerpt}
              </p>
              <Link href={`/blogs/${featuredBlog.slug}`} className="btn btn-gold py-3 px-5 align-self-start rounded-0 text-uppercase letter-spacing-1">
                Read Full Insight
              </Link>
            </div>
          </div>
        )}

        <div className="row g-5">
          {otherBlogs.map((blog: any) => (
            <div className="col-md-6 col-lg-4" key={blog.id}>
              <div className="blog-card h-100 d-flex flex-column rounded-0 border-0">
                <div className="position-relative overflow-hidden" style={{ height: '280px' }}>
                  <img src={blog.image} alt={blog.title} className="w-100 h-100 object-fit-cover transition-transform duration-500 hover:scale-110" />
                  <div className="position-absolute bottom-0 start-0 bg-gold text-black px-4 py-2 small fw-bold letter-spacing-1">
                    {blog.date}
                  </div>
                </div>
                <div className="p-4 d-flex flex-column flex-grow-1 border-start border-end border-bottom border-gold border-opacity-10">
                  <h3 className="h4 text-white mb-3 lh-base" style={{ fontFamily: 'var(--font-serif)' }}>{blog.title}</h3>
                  <p className="text-light opacity-60 flex-grow-1 small lh-relaxed">{blog.excerpt}</p>
                  <Link href={`/blogs/${blog.slug}`} className="btn btn-gold-outline w-100 mt-4 rounded-0 py-3">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {blogs.length === 0 && (
            <div className="col-12 text-center py-5">
              <div className="py-5 border border-gold border-opacity-20 rounded-4">
                <h3 className="text-light opacity-30 fw-light">No editorial insights found.</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
