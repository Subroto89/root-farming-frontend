import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import FeaturedPostCard from '../../components/BlogPageComponents/FeaturedPostCard';
import BlogCategories from '../../components/BlogPageComponents/BlogCategories';
import BlogCard from '../../components/BlogPageComponents/Blogcard';

const Blog = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const { data: featuredPost, isLoading: loadingFeatured } = useQuery({
    queryKey: ['featuredBlog'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/blogs/featured');
      return data;
    },
  });

  const { data: blogPosts = [], isLoading: loadingBlogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/blogs');
      return data;
    },
  });

  if (loadingFeatured || loadingBlogs) {
    return <p className="text-center text-gray-600 py-10">Loading blogs...</p>;
  }

  const categories = ['All Posts', ...new Set(blogPosts.map(b => b.category))];

  const filteredPosts =
    selectedCategory === 'All Posts'
      ? blogPosts
      : blogPosts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Agriculture Blog
          </h1>
          <p className="text-gray-600">
            Expert insights, tips, and latest trends in modern farming
          </p>
        </div>

        {featuredPost && <FeaturedPostCard post={featuredPost} />}

        <BlogCategories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPosts.map(post => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
