import React from "react";
import { User, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "../../hooks/useTheme";

const FeaturedPostCard = ({ post }) => {
  const { theme } = useTheme();
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";

  const navigate = useNavigate();
  if (!post) return null;

  return (
    <div
      className={`${themeForegroundStyle}  rounded-lg shadow-lg overflow-hidden mb-12`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 lg:h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </span>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center mb-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm ml-4">{post.readTime}</span>
          </div>
          <h2 className="text-2xl font-bold  mb-4">{post.title}</h2>
          <p className="text-gray-600 mb-6">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600 mr-4">{post.author}</span>
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{post.date}</span>
            </div>
            <button
              onClick={() => navigate(`/blog/${post._id}`)}
              className="flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              Read More <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostCard;
