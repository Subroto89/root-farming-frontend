import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import useCultivationRequests from '../../allFeieldsApi/UseCultivationRequests';
import LoadingSpinner from '../shared/LoadingSpinner';
// import { toast } from 'react-toastify';

const MyCultivationsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCultivationRequests, cancelRequest } = useCultivationRequests();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getCultivationRequests();
      setRequests(data);
    } catch (error) {
      toast.error('Error loading cultivation requests');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this cultivation request?')) {
      return;
    }

    try {
      await cancelRequest(id);
      toast.success('Cultivation request cancelled successfully');
      fetchRequests();
    } catch (error) {
      toast.error('Error cancelling request');
      console.error('Error:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Cultivation Requests</h1>
        <Link
          to="/dashboard/new-cultivation-request"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          New Request
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No cultivation requests found.</p>
          <Link
            to="/dashboard/new-cultivation-request"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Create your first cultivation request
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map(request => (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">
                  {request.instructionId.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                >
                  {request.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Field:</span>{' '}
                  {request.fieldId.name}
                </p>
                <p>
                  <span className="font-medium">Start Date:</span>{' '}
                  {new Date(request.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Est. End Date:</span>{' '}
                  {new Date(request.estimatedEndDate).toLocaleDateString()}
                </p>
                {request.actualEndDate && (
                  <p>
                    <span className="font-medium">Actual End Date:</span>{' '}
                    {new Date(request.actualEndDate).toLocaleDateString()}
                  </p>
                )}
                {request.progress?.currentPhase !== undefined && (
                  <p>
                    <span className="font-medium">Current Phase:</span>{' '}
                    {request.progress.currentPhase + 1} of{' '}
                    {request.instructionId.phases.length}
                  </p>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/dashboard/cultivation/${request._id}`}
                  className="flex-1 px-3 py-2 text-center text-sm bg-primary text-white rounded hover:bg-primary-dark"
                >
                  View Details
                </Link>
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleCancel(request._id)}
                    className="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCultivationsPage;