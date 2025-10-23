import { Calendar } from 'lucide-react';
import React from 'react'
import { useTheme } from '../hooks/useTheme';

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
    description,
    notes,
  } = data;
  return (
    <div>
      <div className={`${themeForegroundStyle}   rounded-2xl shadow-sm border border-gray-200 p-4 flex justify-between items-start hover:shadow-md transition`}>
      {/* Left section */}

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`${themeFgOfFgStyle}   text-xs font-medium px-2 py-1 rounded-lg`}>
            {activityType}
          </span>
          <span className={`${themeForegroundStyle} text-sm `}>{relatedField}</span>
        </div>

        <h3 className={` `}>{description}</h3>
        <p className="text-sm ">{notes}</p>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1  text-sm">
        <Calendar size={16} />
        <span>{activityDate}</span>
      </div>
    </div>
    </div>
  )
}

export default ActivityCardData
