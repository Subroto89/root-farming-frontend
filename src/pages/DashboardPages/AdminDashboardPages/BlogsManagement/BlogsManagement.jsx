import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Calendar, PlusCircle, Trash2, Edit2 } from 'lucide-react';
import Swal from 'sweetalert2';
import BlogModal from '../../../../components/Dashboard/BlogsManagementComponents/BlogModal';
import BlogForm from '../../../../components/Dashboard/BlogsManagementComponents/BlogForm';
import useAxiosSecure from '../../../../hooks/UseAxiosSecure';

const BlogsManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  // Fetch blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blogs');
      return res.data;
    },
  });

  // Delete blog
  const deleteMutation = useMutation({
    mutationFn: async id => axiosSecure.delete(`/blogs/${id}`),
    onSuccess: () => {
      Toast.fire({ icon: 'success', title: 'Blog deleted successfully!' });
      queryClient.invalidateQueries(['blogs']);
    },
    onError: () => {
      Toast.fire({ icon: 'error', title: 'Failed to delete blog!' });
    },
  });

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this blog!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Blog Management
        </h1>
        <button
          onClick={() => {
            setEditData(null);
            setIsOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <PlusCircle size={18} /> Add Blog
        </button>
      </div>

      {/* Blog Modal */}
      <BlogModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <BlogForm
          defaultValues={editData}
          onSuccess={() => {
            setIsOpen(false);
            queryClient.invalidateQueries(['blogs']);
            Toast.fire({
              icon: 'success',
              title: editData ? 'Updated successfully!' : 'Added successfully!',
            });
          }}
        />
      </BlogModal>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map(blog => (
          <article
            key={blog._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={blog.image || 'https://via.placeholder.com/400x200'}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  {blog.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-4">{blog.date}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{blog.author}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditData(blog);
                      setIsOpen(true);
                    }}
                    className="text-blue-600 flex items-center gap-1 hover:text-blue-700"
                  >
                    <Edit2 size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 flex items-center gap-1 hover:text-red-700"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogsManagement;
