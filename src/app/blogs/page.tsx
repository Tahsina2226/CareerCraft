"use client";

import { useEffect, useState } from "react";
import API from "../../../utils/api";
import Link from "next/link";
import toast from "react-hot-toast";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string;
  author: { id: string; name: string };
  createdAt: string;
  content: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        const blogsData = res.data;
        setBlogs(blogsData);
        
        if (blogsData.length > 0) {
          setFeaturedBlog(blogsData[0]);
        }
      } catch (err) {
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 border-[#5D6D4B] border-b-2 rounded-full w-16 h-16 animate-spin"></div>
          <p className="font-semibold text-[#5D6D4B] text-lg">
            Loading amazing content...
          </p>
        </div>
      </div>
    );

  const regularBlogs = featuredBlog ? blogs.filter(blog => blog.id !== featuredBlog.id) : blogs;

  return (
    <div className="bg-gradient-to-br from-[#B8C4A9] to-[#A8B497] px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="top-0 left-0 fixed bg-[#5D6D4B] opacity-5 rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="right-0 bottom-0 fixed bg-[#B1AB86] opacity-5 rounded-full w-96 h-96 translate-x-1/2 translate-y-1/2"></div>
      <div className="top-1/2 left-1/2 fixed bg-[#7D8566] opacity-3 rounded-full w-64 h-64 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="inline-flex justify-center items-center bg-white/80 shadow-lg mb-6 border border-[#B1AB86]/30 rounded-3xl w-20 h-20 hover:scale-105 transition-all duration-300 transform">
            <svg className="w-10 h-10 text-[#5D6D4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12" />
            </svg>
          </div>
          <h1 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] mb-4 font-bold text-[#5D6D4B] text-transparent text-4xl md:text-6xl">
            Our Blog Collection
          </h1>
          <p className="mx-auto max-w-3xl font-light text-[#7D8566] text-xl md:text-2xl leading-relaxed">
            Discover insightful articles, expert tips, and inspiring stories from our vibrant community
          </p>
          <div className="flex justify-center items-center space-x-2 mt-8">
            <div className="bg-[#B1AB86] opacity-60 rounded-full w-3 h-3 animate-pulse"></div>
            <div className="bg-[#B1AB86] rounded-full w-8 h-1"></div>
            <div className="bg-[#B1AB86] opacity-60 rounded-full w-3 h-3 animate-pulse" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>

        <div className="bg-white/80 shadow-lg hover:shadow-xl backdrop-blur-sm mb-12 p-6 border border-[#B1AB86]/30 rounded-2xl transition-all duration-500">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="hover:scale-110 transition-transform duration-300 transform">
              <div className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] font-bold text-[#5D6D4B] text-transparent text-3xl">{blogs.length}</div>
              <div className="font-medium text-[#7D8566] text-sm">Total Articles</div>
            </div>
            <div className="hidden sm:block bg-[#B1AB86]/30 w-px"></div>
            <div className="hover:scale-110 transition-transform duration-300 transform">
              <div className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] font-bold text-[#5D6D4B] text-transparent text-3xl">{blogs.filter(b => b.content.length > 1000).length}</div>
              <div className="font-medium text-[#7D8566] text-sm">In-Depth Guides</div>
            </div>
            <div className="hidden sm:block bg-[#B1AB86]/30 w-px"></div>
            <div className="hover:scale-110 transition-transform duration-300 transform">
              <div className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] font-bold text-[#5D6D4B] text-transparent text-3xl">{new Set(blogs.map(b => b.author.id)).size}</div>
              <div className="font-medium text-[#7D8566] text-sm">Expert Writers</div>
            </div>
          </div>
        </div>

        {featuredBlog && (
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] font-bold text-[#5D6D4B] text-transparent text-2xl md:text-3xl">Featured Story</h2>
              <div className="flex items-center space-x-2 bg-[#5D6D4B]/10 px-4 py-2 border border-[#5D6D4B]/20 rounded-full">
                <div className="bg-[#5D6D4B] rounded-full w-2 h-2 animate-pulse"></div>
                <span className="font-medium text-[#5D6D4B] text-sm">Latest</span>
              </div>
            </div>
            
            <Link href={`/blogs/${featuredBlog.slug}`} className="group block">
              <div className="bg-white/95 shadow-2xl hover:shadow-3xl backdrop-blur-sm border border-[#B1AB86]/30 rounded-3xl overflow-hidden hover:scale-[1.01] transition-all duration-500 transform">
                <div className="lg:flex">
                  {featuredBlog.coverUrl && (
                    <div className="relative lg:w-2/5 overflow-hidden">
                      <img
                        src={featuredBlog.coverUrl}
                        alt={featuredBlog.title}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="top-4 left-4 absolute bg-white/90 backdrop-blur-sm px-4 py-2 border border-[#B1AB86]/30 rounded-full">
                        <span className="font-semibold text-[#5D6D4B] text-sm">Featured</span>
                      </div>
                      <div className="right-4 bottom-4 absolute bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                        {Math.ceil(featuredBlog.content.split(/\s+/).length / 200)} min read
                      </div>
                    </div>
                  )}
                  <div className="p-8 lg:w-3/5">
                    <h3 className="mb-4 font-bold text-[#5D6D4B] group-hover:text-[#4A5741] text-2xl md:text-3xl leading-tight transition-colors duration-300">
                      {featuredBlog.title}
                    </h3>
                    {featuredBlog.excerpt && (
                      <p className="mb-6 font-light text-[#7D8566] text-lg leading-relaxed">
                        {featuredBlog.excerpt}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4 text-[#7D8566]">
                        <div className="flex items-center space-x-3 bg-[#5D6D4B]/5 px-4 py-2 rounded-full">
                          <div className="flex justify-center items-center bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] rounded-full w-10 h-10 font-bold text-white text-sm">
                            {featuredBlog.author.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium">{featuredBlog.author.name}</span>
                        </div>
                        <span className="text-[#B1AB86]">•</span>
                        <span className="bg-[#B1AB86]/10 px-3 py-1 rounded-full text-sm">{new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-[#5D6D4B]/10 px-4 py-2 rounded-full font-semibold text-[#5D6D4B] group-hover:text-[#4A5741] transition-colors duration-300">
                        <span>Read Story</span>
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] font-bold text-[#5D6D4B] text-transparent text-2xl md:text-3xl">
              {featuredBlog ? "More Stories" : "All Stories"}
            </h2>
            <div className="bg-[#B1AB86]/10 px-4 py-2 border border-[#B1AB86]/20 rounded-full font-medium text-[#7D8566] text-sm">
              {regularBlogs.length} article{regularBlogs.length !== 1 ? 's' : ''}
            </div>
          </div>

          {regularBlogs.length > 0 ? (
            <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
              {regularBlogs.map((blog, index) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  className="group block hover:scale-[1.02] transition-all duration-300 transform"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex flex-col bg-white/95 shadow-lg hover:shadow-2xl backdrop-blur-sm border border-[#B1AB86]/30 group-hover:border-[#5D6D4B]/30 rounded-2xl h-full overflow-hidden transition-all duration-300 transform">
                    {blog.coverUrl ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.coverUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="top-3 right-3 absolute bg-white/90 backdrop-blur-sm px-3 py-1 border border-[#B1AB86]/30 rounded-full">
                          <span className="font-semibold text-[#5D6D4B] text-xs">
                            {Math.ceil(blog.content.split(/\s+/).length / 200)} min read
                          </span>
                        </div>
                        <div className="bottom-3 left-3 absolute bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                          {index + 1}
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex justify-center items-center bg-gradient-to-br from-[#B1AB86] to-[#5D6D4B] h-48">
                        <div className="top-3 right-3 absolute bg-white/90 backdrop-blur-sm px-3 py-1 border border-[#B1AB86]/30 rounded-full">
                          <span className="font-semibold text-[#5D6D4B] text-xs">
                            {Math.ceil(blog.content.split(/\s+/).length / 200)} min read
                          </span>
                        </div>
                        <svg className="w-12 h-12 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}

                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="mb-3 font-bold text-[#5D6D4B] group-hover:text-[#4A5741] text-lg line-clamp-2 leading-tight transition-colors duration-300">
                        {blog.title}
                      </h3>

                      {blog.excerpt && (
                        <p className="flex-1 mb-4 font-light text-[#7D8566] text-sm line-clamp-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      )}

                      <div className="flex justify-between items-center mt-auto pt-4 border-[#B1AB86]/20 border-t">
                        <div className="flex items-center space-x-3 text-[#7D8566] text-xs">
                          <div className="flex items-center space-x-2 bg-[#5D6D4B]/5 px-3 py-1 rounded-full">
                            <div className="flex justify-center items-center bg-gradient-to-r from-[#5D6D4B] to-[#B1AB86] rounded-full w-6 h-6 font-bold text-white text-xs">
                              {blog.author.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium">{blog.author.name}</span>
                          </div>
                          <span className="text-[#B1AB86]">•</span>
                          <span className="bg-[#B1AB86]/5 px-2 py-1 rounded-full">{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-center items-center bg-gradient-to-r from-[#5D6D4B] group-hover:from-[#4A5741] to-[#B1AB86] group-hover:to-[#9c946d] shadow-lg rounded-full w-8 h-8 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 transform">
                          <svg className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 duration-300 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : !featuredBlog && (
            <div className="py-20 text-center">
              <div className="flex justify-center items-center bg-[#5D6D4B]/10 mx-auto mb-8 border border-[#5D6D4B]/20 rounded-full w-32 h-32">
                <svg className="w-16 h-16 text-[#5D6D4B]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] mb-4 font-bold text-[#5D6D4B] text-transparent text-3xl">No blogs yet</h3>
              <p className="mx-auto mb-8 max-w-md font-light text-[#7D8566] text-lg">
                We're working on creating amazing content for you. Check back soon for new articles!
              </p>
              <div className="flex justify-center space-x-2">
                <div className="bg-[#B1AB86] rounded-full w-2 h-2 animate-bounce"></div>
                <div className="bg-[#B1AB86] rounded-full w-2 h-2 animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="bg-[#B1AB86] rounded-full w-2 h-2 animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          )}
        </div>

        <div className="relative bg-white/80 shadow-lg hover:shadow-xl backdrop-blur-sm p-8 border border-[#B1AB86]/30 rounded-3xl overflow-hidden text-center transition-all duration-500">
          <div className="-top-20 -right-20 absolute bg-[#5D6D4B] opacity-5 rounded-full w-40 h-40"></div>
          <div className="-bottom-20 -left-20 absolute bg-[#B1AB86] opacity-5 rounded-full w-40 h-40"></div>
          
          <div className="relative">
            <h3 className="bg-clip-text bg-gradient-to-r from-[#5D6D4B] to-[#7D8566] mb-3 font-bold text-[#5D6D4B] text-transparent text-2xl">Stay Updated</h3>
            <p className="mx-auto mb-6 max-w-md font-light text-[#7D8566]">
              Get notified when we publish new articles and insights
            </p>
            <div className="flex sm:flex-row flex-col gap-3 mx-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/50 px-4 py-3 border border-[#B1AB86]/50 focus:border-[#5D6D4B] rounded-xl focus:outline-none focus:ring-[#B1AB86] focus:ring-2 font-light text-[#1a1a1a] transition-all duration-300 placeholder-[#7D8566]"
              />
              <button className="bg-gradient-to-r from-[#5D6D4B] hover:from-[#4A5741] to-[#B1AB86] hover:to-[#9c946d] shadow-lg hover:shadow-2xl hover:shadow-xl px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 transform">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}