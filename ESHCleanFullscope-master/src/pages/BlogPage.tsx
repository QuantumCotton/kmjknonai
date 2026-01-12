import { Calendar, ArrowRight } from 'lucide-react';
import Button from '../components/shared/Button';

export default function BlogPage() {
  const posts = [
    {
      title: '10 Kitchen Trends Dominating 2026',
      excerpt: 'From smart appliances to sustainable materials, discover what is hot in kitchen remodeling this year.',
      category: 'Kitchen Remodeling',
      date: 'March 15, 2026',
      readTime: '8 min read',
      image: '/images/blog/kitchen-trends.jpg'
    },
    {
      title: 'How to Choose the Right Contractor',
      excerpt: 'A comprehensive guide to vetting contractors and avoiding common pitfalls in the selection process.',
      category: 'Homeowner Guide',
      date: 'March 10, 2026',
      readTime: '12 min read',
      image: '/images/blog/choose-contractor.jpg'
    },
    {
      title: 'Maximizing ROI on Your Bathroom Remodel',
      excerpt: 'Learn which bathroom upgrades deliver the best return on investment and which to skip.',
      category: 'Bathroom Remodeling',
      date: 'March 5, 2026',
      readTime: '10 min read',
      image: '/images/blog/bathroom-roi.jpg'
    },
    {
      title: 'Performance Marketing for Contractors: A Complete Guide',
      excerpt: 'How elite contractors can generate more leads while spending less on marketing.',
      category: 'For Contractors',
      date: 'February 28, 2026',
      readTime: '15 min read',
      image: '/images/blog/performance-marketing.jpg'
    },
    {
      title: 'The ESH Vetting Process: What Makes a Contractor "Elite"',
      excerpt: 'An inside look at our rigorous screening process and what we look for in potential partners.',
      category: 'About ESH',
      date: 'February 20, 2026',
      readTime: '6 min read',
      image: '/images/blog/vetting-process.jpg'
    },
    {
      title: 'Treasure Coast Design Trends 2026',
      excerpt: 'Regional design preferences and popular styles among Florida homeowners.',
      category: 'Market Insights',
      date: 'February 15, 2026',
      readTime: '9 min read',
      image: '/images/blog/treasure-coast-trends.jpg'
    }
  ];

  const categories = ['All', 'Kitchen Remodeling', 'Bathroom Remodeling', 'Homeowner Guide', 'For Contractors', 'Market Insights'];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm tracking-widest text-zinc-500 uppercase mb-4">Expert Guidance</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">Resources & Insights</h1>
          <p className="text-xl text-zinc-400">Learn from industry experts and successful project case studies</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-colors ${
                  cat === 'All'
                    ? 'bg-esh-gold text-black'
                    : 'border border-zinc-800 text-zinc-400 hover:border-esh-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto border border-esh-gold p-8 md:p-12 bg-gradient-to-br from-esh-gold/10 to-black">
            <div className="inline-block px-3 py-1 bg-esh-gold text-black text-xs uppercase tracking-wider mb-4">
              Featured
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4 font-serif">{posts[0].title}</h2>
            <p className="text-zinc-400 text-lg mb-6">{posts[0].excerpt}</p>
            <div className="flex items-center gap-6 text-sm text-zinc-500 mb-6">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {posts[0].date}
              </span>
              <span>{posts[0].readTime}</span>
              <span className="px-3 py-1 border border-zinc-800">{posts[0].category}</span>
            </div>
            <Button variant="accent" className="px-8 py-3">
              Read Article <ArrowRight className="inline ml-2" size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light mb-12 font-serif">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <div key={index} className="border border-zinc-800 bg-black/40 hover:border-esh-gold transition-colors group cursor-pointer">
                <div className="aspect-video bg-zinc-900 border-b border-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-700 text-sm">[Image Placeholder]</span>
                </div>
                <div className="p-6">
                  <div className="inline-block px-2 py-1 bg-zinc-900 text-zinc-500 text-xs uppercase tracking-wider mb-3">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-light mb-3 font-serif group-hover:text-esh-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-zinc-600">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 border-t border-zinc-900 bg-esh-gold">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-4 text-black font-serif">Subscribe to Our Newsletter</h2>
          <p className="text-black/80 mb-8">
            Get weekly insights, tips, and exclusive content delivered to your inbox
          </p>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white text-black border-2 border-black outline-none focus:border-esh-gold-dark"
              required
            />
            <Button variant="primary" type="submit" className="px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
