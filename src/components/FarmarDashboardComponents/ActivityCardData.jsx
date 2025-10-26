import { Calendar, CheckCircle, Clock } from "lucide-react";
import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import Swal from "sweetalert2";

const ActivityCardData = ({ data }) => {
  const { theme } = useTheme();
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =
    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  const {
    _id,
    activityType,
    relatedField,
    activityDate,
    cost,
    title,
    description,
    status: initialStatus, 
  } = data;

  const [status, setStatus] = useState(initialStatus || "pending");

  const handleToggleStatus = async () => {
    const newStatus = status === "pending" ? "complete" : "pending";
    setStatus(newStatus);

    try {
      const res = await fetch(`http://localhost:3000/activities/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await res.json();

      if (result?.modifiedCount > 0) {
        Swal.fire({
          title:
            newStatus === "complete"
              ? "Marked as Completed!"
              : "Marked as Pending",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire({
        title: "Error updating activity",
        icon: "error",
      });
    }
  };

  return (
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

          title={status === "pending" ? "Click If Completed" : "Already Completed"}

          className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium transition
            ${
              status === "pending"
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
        >
          {status === "pending" ? (
            <>
              <Clock  size={14} /> Pending
              
            </>
          ) : (
            <>
              <CheckCircle size={14} /> Completed
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ActivityCardData;
