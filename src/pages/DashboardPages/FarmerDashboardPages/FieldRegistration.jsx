import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import {
  useAddField,
  useDeleteField,
  useFields,
  useUpdateField,
} from '../../../allFeieldsApi/UseFields';
import FieldFormModal from '../../../components/FarmarDashboardComponents/FieldFormModal';
import FieldList from '../../../components/FarmarDashboardComponents/FieldList';
import { useTheme } from '../../../hooks/useTheme'; // ✅ import theme hook

const FieldRegistration = () => {
  const { theme } = useTheme();

  const themeBackgroundStyle = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const themeForegroundStyle = theme === 'dark' ? 'fg-dark ' : 'fg-light ';
  const themeFgOfFgStyle =
    theme === 'dark' ? 'fg-of-fg-dark' : 'fg-of-fg-light';

  const { data: fields = [], isLoading } = useFields();
  const addField = useAddField();
  const updateField = useUpdateField();
  const deleteField = useDeleteField();

  const [showForm, setShowForm] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    soil_type: '',
    irrigation_method: '',
    status: 'Active',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      area: '',
      soil_type: '',
      irrigation_method: '',
      status: 'Active',
      notes: '',
    });
    setEditingField(null);
    setShowForm(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingField) {
      updateField.mutate(
        { id: editingField._id, ...formData },
        {
          onSuccess: () =>
            Swal.fire('Updated!', 'Field updated successfully', 'success'),
        }
      );
    } else {
      addField.mutate(formData, {
        onSuccess: () =>
          Swal.fire('Added!', 'Field added successfully', 'success'),
      });
    }
    resetForm();
  };

  const handleEdit = field => {
    setEditingField(field);
    setFormData({ ...field });
    setShowForm(true);
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This field will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteField.mutate(id, {
          onSuccess: () => Swal.fire('Deleted!', 'Field deleted.', 'success'),
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className={`p-6 ${themeBackgroundStyle}`}>Loading fields...</div>
    );

  return (
    <div
      className={`min-h-[calc(100vh-70px)] transition-colors duration-500 p-4 sm:p-6 lg:p-8 ${themeBackgroundStyle}`}
    >
      {/* Header */}
      <div className={`flex justify-between items-center   p-4 `}>
        <h2 className="text-2xl font-bold">My Lands Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-green-700 text-white `}
        >
          <Plus /> Add New Field
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <FieldFormModal
          show={showForm}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClose={resetForm}
          editing={!!editingField}
          theme={theme} // ✅ pass theme down if needed
        />
      )}

      {/* Field List */}
      <div className={`mt-6`}>
        <FieldList
          fields={fields}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={() => setShowForm(true)}
          themeForegroundStyle={themeForegroundStyle}
          themeFgOfFgStyle={themeFgOfFgStyle}
        />
      </div>
    </div>
  );
};

export default FieldRegistration;
