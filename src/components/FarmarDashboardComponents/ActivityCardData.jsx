import { Calendar, CheckCircle, Clock } from 'lucide-react';
import React, { useState } from 'react'
import { useTheme } from '../../hooks/useTheme';

const ActivityCardData = ({data}) => {
    const { theme } = useTheme();
      const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
      const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
      const themeFgOfFgStyle =    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";
    const {
    _id,
    activityType,
    relatedField,
    activityDate,
    dueDate,
    cost,
    title,
    description
  } = data;

  const [status, setStatus] = useState("pending");

  const handleToggleStatus = () => {
    setStatus((prev) => (prev === "pending" ? "complete" : "pending"));
  };
  return (
    <div>
      <div
      className={`${themeForegroundStyle} rounded-2xl shadow-sm border border-gray-200 p-4 flex justify-between items-start hover:shadow-md transition`}
    >
      {/* Left section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`${themeFgOfFgStyle} text-xs font-medium px-2 py-1 rounded-lg`}
          >
            {activityType}
          </span>
          <span className={`${themeForegroundStyle} text-sm`}>
            {relatedField}
          </span>
        </div>

        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>

      {/* Right section */}
      <div className="flex flex-col items-end gap-2 text-sm">
        <div className="flex items-center gap-1 text-gray-500">
          <Calendar size={16} />
          <span>{activityDate}</span>
        </div>

        {/* Status Button */}
        <button
          onClick={handleToggleStatus}
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium transition
          ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {status === "pending" ? (
            <>
              <Clock size={14} /> Pending
            </>
          ) : (
            <>
              <CheckCircle size={14} /> Completed
            </>
          )}
        </button>
      </div>
    </div>
    </div>
  )
}

export default ActivityCardData
