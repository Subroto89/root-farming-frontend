import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle, Trash2, Edit2 } from 'lucide-react';
import Swal from 'sweetalert2';
import GovtNewsForm from '../../../../components/Dashboard/GovtNewsComponents/GovtNewsForm';
import GovtNewsModal from '../../../../components/Dashboard/GovtNewsComponents/GovtNewsModal';
import useAxiosSecure from '../../../../hooks/UseAxiosSecure';

const GovtNewsAndFacilities = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // SweetAlert2 Toast setup
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  // Fetch all news
  const { data: newsList = [], isLoading } = useQuery({
    queryKey: ['govtNews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/govt-news');
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async id => await axiosSecure.delete(`/govt-news/${id}`),
    onSuccess: () => {
      Toast.fire({
        icon: 'success',
        title: 'Deleted successfully!',
      });
      queryClient.invalidateQueries(['govtNews']);
    },
    onError: () => {
      Toast.fire({
        icon: 'error',
        title: 'Delete failed!',
      });
    },
  });

  // Confirm before delete
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📰 Govt News & Facilities</h1>
        <button
          onClick={() => {
            setEditData(null);
            setIsOpen(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <PlusCircle size={18} /> Add News
        </button>
      </div>

      {/* Modal for Add/Edit */}
      <GovtNewsModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <GovtNewsForm
          defaultValues={editData}
          onSuccess={() => {
            setIsOpen(false);
            queryClient.invalidateQueries(['govtNews']);
            Toast.fire({
              icon: 'success',
              title: editData ? 'Updated successfully!' : 'Added successfully!',
            });
          }}
        />
      </GovtNewsModal>

      {/* News List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {newsList.map(item => (
          <div key={item._id} className="border rounded-lg p-4 shadow">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              {item.category} | Published: {item.publishedDate}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Start: {new Date(item.start).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              End: {new Date(item.end).toLocaleString()}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600 flex items-center gap-1 hover:text-red-700"
              >
                <Trash2 size={16} /> Delete
              </button>

              <button
                onClick={() => {
                  setEditData(item);
                  setIsOpen(true);
                }}
                className="text-blue-600 flex items-center gap-1 hover:text-blue-700"
              >
                <Edit2 size={16} /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovtNewsAndFacilities;
