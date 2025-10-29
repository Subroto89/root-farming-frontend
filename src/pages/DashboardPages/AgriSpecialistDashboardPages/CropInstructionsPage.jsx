import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { toast } from 'react-hot-toast';
import InstructionEditor from '../../../components/AgriSpecialist/InstructionEditor';

const CropInstructionsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingInstruction, setEditingInstruction] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    searchTerm: ''
  });

  // Fetch instructions
  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await axiosSecure.get('/api/instructions', {
          params: filters
        });
        setInstructions(response.data);
      } catch (error) {
        console.error('Error fetching instructions:', error);
        toast.error('Failed to load instructions');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructions();
  }, [axiosSecure, filters]);

  const handleSaveInstruction = async (instructionData) => {
    try {
      if (editingInstruction) {
        await axiosSecure.put(`/api/instructions/${editingInstruction._id}`, instructionData);
        toast.success('Instruction updated successfully');
      } else {
        await axiosSecure.post('/api/instructions', instructionData);
        toast.success('Instruction created successfully');
      }
      
      setShowEditor(false);
      setEditingInstruction(null);
      // Refresh the list
      const response = await axiosSecure.get('/api/instructions', {
        params: filters
      });
      setInstructions(response.data);
    } catch (error) {
      console.error('Error saving instruction:', error);
      toast.error('Failed to save instruction');
      throw error;
    }
  };

  const handleEditInstruction = (instruction) => {
    setEditingInstruction(instruction);
    setShowEditor(true);
  };

  const handleDeleteInstruction = async (instructionId) => {
    if (!window.confirm('Are you sure you want to delete this instruction?')) {
      return;
    }

    try {
      await axiosSecure.delete(`/api/instructions/${instructionId}`);
      toast.success('Instruction deleted successfully');
      setInstructions(instructions.filter(i => i._id !== instructionId));
    } catch (error) {
      console.error('Error deleting instruction:', error);
      toast.error('Failed to delete instruction');
    }
  };

  if (showEditor) {
    return (
      <div className="p-6">
        <InstructionEditor
          onSave={handleSaveInstruction}
          initialData={editingInstruction}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Crop Instructions</h1>
        <button
          onClick={() => setShowEditor(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create New Instruction
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search instructions..."
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          className="p-2 border rounded flex-1"
        />
      </div>

      {/* Instructions List */}
      {loading ? (
        <div className="text-center py-8">Loading instructions...</div>
      ) : (
        <div className="grid gap-6">
          {instructions.map(instruction => (
            <div
              key={instruction._id}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {instruction.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {instruction.description}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>Phases: {instruction.phases.length}</span>
                    <span>•</span>
                    <span>Duration: {instruction.phases.reduce((total, phase) => total + phase.duration, 0)} days</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditInstruction(instruction)}
                    className="px-3 py-1 text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteInstruction(instruction._id)}
                    className="px-3 py-1 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {instructions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No instructions found. Create your first instruction to get started!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CropInstructionsPage;