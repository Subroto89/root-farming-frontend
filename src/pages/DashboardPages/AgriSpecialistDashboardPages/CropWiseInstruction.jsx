import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const CropWiseInstruction = ({ initialData = null }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cropCategories, setCropCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [variants, setVariants] = useState([]);

  const [instruction, setInstruction] = useState({
    title: '',
    categoryId: '',
    subCategoryId: '',
    variantId: '',
    description: '',
    phases: [
      {
        name: 'Land Preparation',
        dayOffset: 0,
        duration: 7,
        description: '',
        tasks: []
      }
    ]
  });

  // Load crop categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosSecure.get('/api/crops/categories');
        setCropCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load crop categories');
      }
    };

    fetchCategories();
  }, [axiosSecure]);

  // Load sub-categories when category changes
  useEffect(() => {
    if (!instruction.categoryId) return;

    const fetchSubCategories = async () => {
      try {
        const response = await axiosSecure.get(`/api/crops/subcategories/${instruction.categoryId}`);
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching sub-categories:', error);
        toast.error('Failed to load sub-categories');
      }
    };

    fetchSubCategories();
  }, [instruction.categoryId, axiosSecure]);

  // Load variants when sub-category changes
  useEffect(() => {
    if (!instruction.subCategoryId) return;

    const fetchVariants = async () => {
      try {
        const response = await axiosSecure.get(`/api/crops/variants/${instruction.subCategoryId}`);
        setVariants(response.data);
      } catch (error) {
        console.error('Error fetching variants:', error);
        toast.error('Failed to load variants');
      }
    };

    fetchVariants();
  }, [instruction.subCategoryId, axiosSecure]);

  // Load existing data if editing
  useEffect(() => {
    if (initialData) {
      setInstruction(initialData);
    }
  }, [initialData]);

  const handlePhaseChange = (index, field, value) => {
    const newPhases = [...instruction.phases];
    newPhases[index] = {
      ...newPhases[index],
      [field]: value
    };
    setInstruction({ ...instruction, phases: newPhases });
  };

  const addPhase = () => {
    const lastPhase = instruction.phases[instruction.phases.length - 1];
    const newDayOffset = lastPhase.dayOffset + lastPhase.duration;

    setInstruction({
      ...instruction,
      phases: [
        ...instruction.phases,
        {
          name: '',
          dayOffset: newDayOffset,
          duration: 7,
          description: '',
          tasks: []
        }
      ]
    });
  };

  const removePhase = (index) => {
    if (instruction.phases.length <= 1) {
      toast.error('Cannot remove the last phase');
      return;
    }

    const newPhases = instruction.phases.filter((_, i) => i !== index);
    setInstruction({ ...instruction, phases: newPhases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...instruction,
        authorId: user.uid,
        createdAt: new Date().toISOString()
      };

      if (initialData) {
        await axiosSecure.put(`/api/instructions/${initialData._id}`, payload);
      } else {
        await axiosSecure.post('/api/instructions', payload);
      }
      toast.success('Instruction saved successfully');
    } catch (error) {
      console.error('Error saving instruction:', error);
      toast.error('Failed to save instruction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">
          {initialData ? 'Edit Instruction' : 'Create New Instruction'}
        </h2>

        {/* Basic Information */}
        <div className="grid gap-6 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              value={instruction.title}
              onChange={(e) => setInstruction({ ...instruction, title: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Category</label>
              <select
                value={instruction.categoryId}
                onChange={(e) => setInstruction({ ...instruction, categoryId: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                {cropCategories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Sub Category</label>
              <select
                value={instruction.subCategoryId}
                onChange={(e) => setInstruction({ ...instruction, subCategoryId: e.target.value })}
                className="w-full p-2 border rounded"
                required
                disabled={!instruction.categoryId}
              >
                <option value="">Select Sub Category</option>
                {subCategories.map(sub => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Variant</label>
              <select
                value={instruction.variantId}
                onChange={(e) => setInstruction({ ...instruction, variantId: e.target.value })}
                className="w-full p-2 border rounded"
                required
                disabled={!instruction.subCategoryId}
              >
                <option value="">Select Variant</option>
                {variants.map(variant => (
                  <option key={variant._id} value={variant._id}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
              value={instruction.description}
              onChange={(e) => setInstruction({ ...instruction, description: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
              rows="4"
              required
            />
          </div>
        </div>

        {/* Phases */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Cultivation Phases</h3>
            <button
              type="button"
              onClick={addPhase}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Phase
            </button>
          </div>

          {instruction.phases.map((phase, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="grid gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium">Phase Name</label>
                    <input
                      type="text"
                      value={phase.name}
                      onChange={(e) => handlePhaseChange(index, 'name', e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePhase(index)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Start Day</label>
                    <input
                      type="number"
                      value={phase.dayOffset}
                      onChange={(e) => handlePhaseChange(index, 'dayOffset', parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Duration (days)</label>
                    <input
                      type="number"
                      value={phase.duration}
                      onChange={(e) => handlePhaseChange(index, 'duration', parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Phase Description</label>
                  <textarea
                    value={phase.description}
                    onChange={(e) => handlePhaseChange(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Instruction'}
        </button>
      </div>
    </form>
  );
};

export default CropWiseInstruction;