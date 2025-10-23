import React from 'react';
import { X } from 'lucide-react';
import FromInputField from './FromInputField';

const FieldFormModal = ({
  show,
  onClose,
  formData,
  setFormData,
  onSubmit,
  editing,
  theme, // ✅ Receive theme from parent
}) => {
  if (!show) return null;

  // ✅ Theme-based dynamic styles
  // const themeBackgroundStyle = theme === 'dark' ? 'bg-dark' : 'bg-light';
  // const themeForegroundStyle = theme === 'dark' ? 'fg-dark' : 'fg-light';
  // const themeFgOfFgStyle =
  //   theme === 'dark' ? 'fg-of-fg-dark' : 'fg-of-fg-light';
  const modalBg =
    theme === 'dark'
      ? 'bg-[#1e1e1e] text-gray-100 border-gray-700'
      : 'bg-white text-gray-900 border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-50 ' : 'bg-gray-50';
  const buttonPrimary =
    theme === 'dark'
      ? 'bg-green-700 hover:bg-green-600 text-white'
      : 'bg-green-600 hover:bg-green-700 text-white';
  const buttonCancel =
    theme === 'dark'
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
      : 'bg-gray-300 hover:bg-gray-400 text-gray-900';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border transition-colors duration-500 ${modalBg}`}
      >
        {/* Modal Header */}
        <div
          className={`p-6 border-b flex justify-between items-center transition-colors duration-500 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <h3 className="text-xl font-semibold">
            {editing ? 'Edit Field' : 'Register New Field'}
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-opacity-20 transition ${
              theme === 'dark'
                ? 'hover:bg-gray-600 text-gray-300'
                : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FromInputField
              name="name"
              label="Field Name"
              placeholder="e.g., North Field"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              inputClass={inputBg}
              theme={theme}
            />

            <FromInputField
              name="area"
              label="Area (acres)"
              type="number"
              placeholder="e.g., 5.5"
              value={formData.area}
              onChange={e => setFormData({ ...formData, area: e.target.value })}
              inputClass={inputBg}
              theme={theme}
            />

            <FromInputField
              name="soil_type"
              label="Soil Type"
              type="select"
              value={formData.soil_type}
              onChange={e =>
                setFormData({ ...formData, soil_type: e.target.value })
              }
              options={[
                { value: 'Clay', label: 'Clay' },
                { value: 'Sandy', label: 'Sandy' },
                { value: 'Loamy', label: 'Loamy' },
                { value: 'Silty', label: 'Silty' },
                { value: 'Peaty', label: 'Peaty' },
                { value: 'Chalky', label: 'Chalky' },
              ]}
              inputClass={inputBg}
              theme={theme}
            />

            <FromInputField
              name="irrigation_method"
              label="Irrigation Method"
              type="select"
              value={formData.irrigation_method}
              onChange={e =>
                setFormData({
                  ...formData,
                  irrigation_method: e.target.value,
                })
              }
              options={[
                { value: 'Drip', label: 'Drip Irrigation' },
                { value: 'Sprinkler', label: 'Sprinkler' },
                { value: 'Surface', label: 'Surface Irrigation' },
                { value: 'Manual', label: 'Manual' },
                { value: 'Rainfed', label: 'Rainfed' },
              ]}
              inputClass={inputBg}
              theme={theme}
            />

            <FromInputField
              name="status"
              label="Status"
              type="select"
              value={formData.status}
              onChange={e =>
                setFormData({ ...formData, status: e.target.value })
              }
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Harvested', label: 'Harvested' },
                { value: 'Idle', label: 'Idle' },
              ]}
              inputClass={inputBg}
              theme={theme}
            />
          </div>

          {/* Notes Field */}
          <FromInputField
            name="notes"
            label="Notes"
            type="textarea"
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            inputClass={inputBg}
            theme={theme}
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${buttonPrimary}`}
            >
              {editing ? 'Update Field' : 'Register Field'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${buttonCancel}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldFormModal;
