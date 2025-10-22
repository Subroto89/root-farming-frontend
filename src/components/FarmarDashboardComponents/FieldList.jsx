import React from 'react';
import { MapPin, Edit, Trash2 } from 'lucide-react';

const FieldList = ({
  fields = [],
  onEdit,
  onDelete,
  onAdd,
  themeForegroundStyle,
}) => {
  // If fields is undefined or empty, show empty state
  if (!Array.isArray(fields) || fields.length === 0) {
    return (
      <div
        className={`${themeForegroundStyle} col-span-full text-center py-12`}
      >
        <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="mb-4 text-lg font-medium">No fields registered yet</p>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Register Your First Field
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${themeForegroundStyle} overflow-x-auto rounded-xl shadow-lg`}
    >
      <table className="min-w-full border-collapse my-1">
        <thead className={`${themeForegroundStyle}`}>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Area</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Soil Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Irrigation
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Notes</th>
            <th className="px-6 py-3 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map(field => (
            <tr
              key={field._id}
              className={`${themeForegroundStyle} border-t transition-colors`}
            >
              <td className="px-6 py-3 font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                {field.name || '-'}
              </td>
              <td className="px-6 py-3">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    field.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : field.status === 'Harvested'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {field.status || '-'}
                </span>
              </td>
              <td className="px-6 py-3 text-sm">{field.area || '-'} acres</td>
              <td className="px-6 py-3 text-sm">{field.soil_type || '-'}</td>
              <td className="px-6 py-3 text-sm">
                {field.irrigation_method || '-'}
              </td>
              <td className="px-6 py-3 text-sm text-gray-600">
                {field.notes || '-'}
              </td>
              <td className="px-6 py-3 flex justify-center gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(field)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm flex items-center gap-1 transition"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(field._id)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FieldList;
