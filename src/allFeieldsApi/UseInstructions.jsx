import useAxiosSecure from "../hooks/UseAxiosSecure";

const useInstructionsApi = () => {
  const axiosSecure = useAxiosSecure();
  const baseUrl = '/instructions';

  return {
    // Get all published instructions
    getInstructions: async (filters = {}) => {
      const queryParams = new URLSearchParams(filters);
      const response = await axiosSecure.get(`${baseUrl}?${queryParams}`);
      return response.data;
    },

    // Get instruction by ID
    getInstructionById: async (id) => {
      const response = await axiosSecure.get(`${baseUrl}/${id}`);
      return response.data;
    },

    // Create new instruction
    createInstruction: async (instructionData) => {
      const response = await axiosSecure.post(baseUrl, instructionData);
      return response.data;
    },

    // Update instruction
    updateInstruction: async (id, instructionData) => {
      const response = await axiosSecure.put(`${baseUrl}/${id}`, instructionData);
      return response.data;
    },

    // Delete instruction
    deleteInstruction: async (id) => {
      await axiosSecure.delete(`${baseUrl}/${id}`);
    },

    // Get all instructions by current specialist
    getMyInstructions: async () => {
      const response = await axiosSecure.get('/my-instructions');
      return response.data;
    }
  };
};

export default useInstructionsApi;