// -------------------------------------------
// TaskDetails Component
// Modal showing detailed task information
// -------------------------------------------

import { format } from "date-fns";

const TaskDetails = ({ task, onClose, onStatusChange }) => {
  if (!task) return null;

  const handleStatusChange = (newStatus) => {
    onStatusChange(task.cultivationId, task.id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Task content */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{task.text}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {format(task.date, "MMMM d, yyyy")} • {task.phase}
          </p>
          {task.description && (
            <p className="text-gray-700 mb-4">{task.description}</p>
          )}
        </div>

        {/* Status controls */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Status:</span>
          <button
            onClick={() => handleStatusChange("pending")}
            className={`px-3 py-1 rounded-full text-sm ${
              task.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleStatusChange("completed")}
            className={`px-3 py-1 rounded-full text-sm ${
              task.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => handleStatusChange("skipped")}
            className={`px-3 py-1 rounded-full text-sm ${
              task.status === "skipped"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Skipped
          </button>
        </div>

        {/* Task metadata */}
        {task.metadata && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </h4>
            <div className="text-sm text-gray-600">
              {Object.entries(task.metadata).map(([key, value]) => (
                <div key={key} className="flex items-start mb-1">
                  <span className="font-medium mr-2">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;