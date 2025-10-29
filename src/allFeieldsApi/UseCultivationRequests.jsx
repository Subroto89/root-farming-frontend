import useAxiosSecure from "../hooks/UseAxiosSecure";


const useCultivationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const baseUrl = '/cultivation-requests';

  return {
    // Get all cultivation requests for the current farmer
    getCultivationRequests: async () => {
      const response = await axiosSecure.get(baseUrl);
      return response.data;
    },

    // Get cultivation request by ID
    getCultivationRequestById: async (id) => {
      const response = await axiosSecure.get(`${baseUrl}/${id}`);
      return response.data;
    },

    // Create new cultivation request
    createCultivationRequest: async (requestData) => {
      const response = await axiosSecure.post(baseUrl, requestData);
      return response.data;
    },

    // Update cultivation request progress
    updateProgress: async (id, progressData) => {
      const response = await axiosSecure.put(`${baseUrl}/${id}/progress`, progressData);
      return response.data;
    },

    // Cancel cultivation request
    cancelRequest: async (id) => {
      const response = await axiosSecure.put(`${baseUrl}/${id}/cancel`);
      return response.data;
    }
  };
};

export default useCultivationRequests;