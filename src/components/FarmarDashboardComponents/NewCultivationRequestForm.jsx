import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {useAuth} from '../../hooks/useAuth';
import { useFields } from '../../allFeieldsApi/UseFields';
import useInstructionsApi from '../../allFeieldsApi/UseInstructions';
import useCultivationRequests from '../../allFeieldsApi/UseCultivationRequests';
// import { toast } from 'react-toastify';

const NewCultivationRequestForm = () => {
  const { user } = useAuth();
  const { getFields } = useFields();
  const { getInstructions } = useInstructionsApi();
  const { createCultivationRequest } = useCultivationRequests();
  const navigate = useNavigate();

  const [fields, setFields] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fieldId: '',
    instructionId: '',
    startDate: '',
    notes: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fieldsData, instructionsData] = await Promise.all([
          getFields(),
          getInstructions()
        ]);
        setFields(fieldsData);
        setInstructions(instructionsData);
      } catch (error) {
        toast.error('Error loading data');
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Find the selected instruction to calculate end date
      const selectedInstruction = instructions.find(i => i._id === formData.instructionId);
      const startDate = new Date(formData.startDate);
      const estimatedEndDate = new Date(startDate);
      estimatedEndDate.setDate(startDate.getDate() + selectedInstruction.totalDuration);

      await createCultivationRequest({
        ...formData,
        estimatedEndDate
      });

      toast.success('Cultivation request submitted successfully');
      navigate('/dashboard/my-cultivations');
    } catch (error) {
      toast.error('Error submitting request');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">New Cultivation Request</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Field Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Field
          </label>
          <select
            name="fieldId"
            value={formData.fieldId}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="">Choose a field...</option>
            {fields.map(field => (
              <option key={field._id} value={field._id}>
                {field.name} ({field.size} acres)
              </option>
            ))}
          </select>
        </div>

        {/* Instruction Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Crop Instruction
          </label>
          <select
            name="instructionId"
            value={formData.instructionId}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="">Choose an instruction...</option>
            {instructions.map(instruction => (
              <option key={instruction._id} value={instruction._id}>
                {instruction.title} ({instruction.totalDuration} days)
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            placeholder="Any specific requirements or notes..."
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCultivationRequestForm;