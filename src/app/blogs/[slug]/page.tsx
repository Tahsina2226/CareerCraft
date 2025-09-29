"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../../utils/api";
import toast from "react-hot-toast";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverUrl?: string;
  published: boolean;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/slug/${slug}`);
        setBlog(res.data);
      } catch (err) {
        toast.error("Blog not found", { 
          style: { background: "#D84A4A", color: "#fff" },
          icon: '❌'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = blog?.title || '';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      copy: url
    };

    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!', {
        style: { background: "#5D6D4B", color: "#fff" }
      });
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
    setShowShareMenu(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 border-[#5D6D4B] border-b-2 rounded-full w-16 h-16 animate-spin"></div>
          <p className="font-semibold text-[#5D6D4B] text-lg">
            Loading article...
          </p>
        </div>
      </div>
    );
  
  if (!blog)
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] min-h-screen">
        <div className="mx-auto p-8 max-w-md text-center">
          <div className="flex justify-center items-center bg-white/80 shadow-lg mx-auto mb-6 border border-[#B1AB86]/30 rounded-full w-32 h-32">
            <svg className="w-16 h-16 text-[#5D6D4B]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] mb-4 font-bold text-[#5D6D4B] text-transparent text-3xl">Article Not Found</h1>
          <p className="mb-8 text-[#7D8566] text-lg">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link 
            href="/blogs" 
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-2xl hover:shadow-3xl px-8 py-4 rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300 transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>
    );

  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);
  const wordCount = blog.content.split(/\s+/).length;

  return (
    <div className="relative bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="top-0 left-0 fixed bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2 animate-float"></div>
      <div className="right-0 bottom-0 fixed bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 translate-x-1/2 translate-y-1/2 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="top-1/3 left-1/4 fixed bg-[#7D8566] opacity-3 rounded-full w-48 h-48 animate-float" style={{animationDelay: '4s'}}></div>
      <div className="right-1/3 bottom-1/4 fixed bg-[#B1AB86] opacity-4 rounded-full w-32 h-32 animate-float" style={{animationDelay: '1s'}}></div>

      {/* Reading Progress Bar */}
      <div className="top-0 left-0 z-50 fixed bg-[#B1AB86]/20 backdrop-blur-sm w-full h-1.5">
        <div 
          className="bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-lg h-full transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Floating Action Buttons */}
      <div className="top-1/2 right-8 z-40 fixed flex flex-col space-y-4 -translate-y-1/2 transform">
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-4 rounded-2xl shadow-2xl backdrop-blur-sm border transition-all duration-300 transform hover:scale-110 ${
            isBookmarked 
              ? 'bg-[#5D6D4B] text-white border-[#5D6D4B]' 
              : 'bg-white/90 text-[#5D6D4B] border-[#B1AB86]/30 hover:bg-[#5D6D4B] hover:text-white'
          }`}
        >
          <svg className="w-6 h-6" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="bg-white/90 hover:bg-[#5D6D4B] shadow-2xl backdrop-blur-sm p-4 border border-[#B1AB86]/30 rounded-2xl text-[#5D6D4B] hover:text-white hover:scale-110 transition-all duration-300 transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          {showShareMenu && (
            <div className="top-1/2 right-full absolute bg-white/95 shadow-2xl backdrop-blur-sm mr-4 p-4 border border-[#B1AB86]/30 rounded-2xl min-w-48 -translate-y-1/2 transform">
              <div className="flex flex-col space-y-3">
                <button onClick={() => handleShare('twitter')} className="flex items-center space-x-3 hover:bg-[#5D6D4B]/10 p-3 rounded-xl transition-all duration-200">
                  <div className="flex justify-center items-center bg-[#1DA1F2] rounded-full w-8 h-8">
                    <span className="font-bold text-white text-sm">𝕏</span>
                  </div>
                  <span className="font-medium text-[#5D6D4B]">Twitter</span>
                </button>
                <button onClick={() => handleShare('linkedin')} className="flex items-center space-x-3 hover:bg-[#5D6D4B]/10 p-3 rounded-xl transition-all duration-200">
                  <div className="flex justify-center items-center bg-[#0077B5] rounded-full w-8 h-8">
                    <span className="font-bold text-white text-sm">in</span>
                  </div>
                  <span className="font-medium text-[#5D6D4B]">LinkedIn</span>
                </button>
                <button onClick={() => handleShare('facebook')} className="flex items-center space-x-3 hover:bg-[#5D6D4B]/10 p-3 rounded-xl transition-all duration-200">
                  <div className="flex justify-center items-center bg-[#4267B2] rounded-full w-8 h-8">
                    <span className="font-bold text-white text-sm">f</span>
                  </div>
                  <span className="font-medium text-[#5D6D4B]">Facebook</span>
                </button>
                <button onClick={() => handleShare('copy')} className="flex items-center space-x-3 hover:bg-[#5D6D4B]/10 p-3 rounded-xl transition-all duration-200">
                  <div className="flex justify-center items-center bg-[#B1AB86] rounded-full w-8 h-8">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-[#5D6D4B]">Copy Link</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/blogs" 
          className="group inline-flex items-center space-x-3 bg-white/80 hover:bg-white shadow-lg hover:shadow-xl backdrop-blur-sm mb-8 px-6 py-3 border border-[#B1AB86]/30 rounded-2xl font-semibold text-[#5D6D4B] hover:text-[#4A5741] hover:scale-105 transition-all duration-300 transform"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Blogs</span>
        </Link>

        {/* Article Container */}
        <article className="bg-white/95 shadow-2xl hover:shadow-3xl backdrop-blur-sm border border-[#B1AB86]/30 rounded-3xl overflow-hidden transition-all duration-500 transform">
          {/* Cover Image */}
          {blog.coverUrl && (
            <div className="relative h-80 md:h-96 overflow-hidden">
              <img
                src={blog.coverUrl}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="top-6 right-6 absolute bg-white/90 shadow-lg backdrop-blur-sm px-4 py-2 border border-[#B1AB86]/30 rounded-full">
                <span className="font-semibold text-[#5D6D4B] text-sm">{blog.published ? "📖 Published" : "📝 Draft"}</span>
              </div>
              <div className="bottom-6 left-6 absolute bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full font-medium text-white text-sm">
                ⏱️ {readingTime} min read • 📊 {wordCount} words
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="p-8 md:p-12">
            {/* Header */}
            <header className="mb-8 text-center">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <div className="bg-[#5D6D4B]/10 shadow-sm px-4 py-2 border border-[#5D6D4B]/20 rounded-full">
                  <span className="font-medium text-[#5D6D4B] text-sm">⏱️ {readingTime} min read</span>
                </div>
                <div className="bg-[#B1AB86]/10 shadow-sm px-4 py-2 border border-[#B1AB86]/20 rounded-full">
                  <span className="font-medium text-[#7D8566] text-sm">
                    📅 {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="bg-[#7D8566]/10 shadow-sm px-4 py-2 border border-[#7D8566]/20 rounded-full">
                  <span className="font-medium text-[#5D6D4B] text-sm">📊 {wordCount} words</span>
                </div>
              </div>

              <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] mb-6 font-bold text-[#5D6D4B] text-transparent text-4xl md:text-5xl lg:text-6xl leading-tight">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="bg-[#B1AB86]/5 mx-auto px-6 py-4 border border-[#B1AB86]/20 rounded-2xl max-w-3xl font-light text-[#7D8566] text-xl italic leading-relaxed">
                  {blog.excerpt}
                </p>
              )}
            </header>

            {/* Author Info */}
            <div className="flex justify-center items-center mb-12">
              <div className="flex items-center space-x-6 bg-gradient-to-r from-[#5D6D4B]/5 to-[#B1AB86]/5 shadow-lg hover:shadow-xl px-8 py-6 border border-[#5D6D4B]/20 rounded-2xl hover:scale-105 transition-all duration-300 transform">
                <div className="flex justify-center items-center bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] shadow-lg rounded-full w-16 h-16 font-bold text-white text-xl">
                  {blog.author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="sm:text-left text-center">
                  <p className="font-bold text-[#5D6D4B] text-lg">👤 {blog.author.name}</p>
                  <p className="mt-1 text-[#7D8566] text-sm">✉️ {blog.author.email}</p>
                  <div className="flex justify-center sm:justify-start space-x-2 mt-2">
                    <div className="bg-[#5D6D4B] rounded-full w-2 h-2 animate-pulse"></div>
                    <span className="text-[#7D8566] text-xs">Active Writer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div 
              className="hover:prose-a:bg-[#5D6D4B] prose-a:bg-[#5D6D4B]/10 prose-blockquote:bg-[#B1AB86]/10 prose-code:bg-[#B1AB86]/10 prose-th:bg-[#5D6D4B] prose-pre:bg-gradient-to-br prose-pre:from-[#1a1a1a] prose-pre:to-[#2d2d2d] prose-img:shadow-lg prose-pre:shadow-lg prose-img:mx-auto prose-h1:mt-12 prose-h2:mt-10 prose-h3:mt-8 prose-h1:mb-8 prose-h2:mb-6 prose-h3:mb-4 prose-a:px-2 prose-blockquote:px-6 prose-code:px-3 prose-a:py-1 prose-blockquote:py-4 prose-code:py-2 prose-img:border prose-pre:border prose-table:border prose-img:border-[#B1AB86]/20 prose-pre:border-[#B1AB86]/20 prose-table:border-[#B1AB86]/30 prose-td:border-[#B1AB86]/20 prose-td:border-t prose-blockquote:border-l-[#B1AB86] prose-blockquote:border-l-4 prose-a:rounded-lg prose-blockquote:rounded-xl prose-code:rounded-xl prose-img:rounded-2xl prose-pre:rounded-2xl prose-table:rounded-xl max-w-none prose-table:overflow-hidden prose-code:font-mono prose-a:font-medium prose-th:font-semibold prose-headings:font-bold prose-li:marker:font-bold prose-strong:font-bold hover:prose-a:text-white prose-a:text-[#5D6D4B] prose-blockquote:text-[#7D8566] prose-code:text-[#5D6D4B] prose-headings:text-[#5D6D4B] prose-li:marker:text-[#5D6D4B] prose-ol:text-[#1a1a1a] prose-p:text-[#1a1a1a] prose-pre:text-white prose-strong:text-[#5D6D4B] prose-th:text-white prose-ul:text-[#1a1a1a] prose-code:text-sm prose-p:text-lg prose-h3:text-2xl prose-h2:text-3xl prose-h1:text-4xl prose-a:no-underline prose-blockquote:italic prose-li:leading-relaxed prose-p:leading-relaxed prose prose-lg"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-[#B1AB86]/30 border-t">
              <div className="flex sm:flex-row flex-col justify-between items-center gap-6">
                <div className="flex items-center space-x-4 text-[#7D8566]">
                  <div className="flex items-center space-x-3 bg-[#B1AB86]/5 px-4 py-2 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-sm">
                      Published on {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </article>

        {/* Newsletter & Related Articles */}
        <div className="gap-8 grid md:grid-cols-2 mt-12">
          {/* Newsletter CTA */}
          <div className="bg-gradient-to-br from-[#5D6D4B] to-[#B1AB86] shadow-2xl p-8 rounded-2xl text-white hover:scale-105 transition-all duration-500 transform">
            <h3 className="mb-4 font-bold text-2xl">💌 Stay Updated</h3>
            <p className="opacity-90 mb-6">
              Get the latest articles and insights delivered to your inbox
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 px-4 py-3 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
              />
              <button className="bg-white hover:bg-[#F9F5F0] px-6 py-3 rounded-xl font-semibold text-[#5D6D4B] hover:scale-105 transition-all duration-300 transform">
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Related Articles CTA */}
          <div className="bg-white/95 shadow-2xl backdrop-blur-sm p-8 border border-[#B1AB86]/30 rounded-2xl hover:scale-105 transition-all duration-500 transform">
            <h3 className="mb-4 font-bold text-[#5D6D4B] text-2xl">📚 More Stories</h3>
            <p className="mb-6 text-[#7D8566]">
              Discover more insightful stories from our collection
            </p>
            <Link 
              href="/blogs"
              className="inline-flex justify-center items-center space-x-3 bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-lg hover:shadow-xl px-6 py-3 rounded-xl w-full font-semibold text-white hover:scale-105 transition-all duration-300 transform"
            >
              <span>Explore All Articles</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}