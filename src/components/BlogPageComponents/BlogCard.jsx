import React from 'react';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const BlogCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-4">{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          <button
            onClick={() => navigate(`/blog/${post._id}`)}
            className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
          >
            Read More <ArrowRight className="h-3 w-3 ml-1" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
