import React from "react";
import Swal from "sweetalert2";

// ---------------------------------------------------------------------------
// ✅ ClearAllSalaryButton (Dummy Mode)
// ---------------------------------------------------------------------------
// Props:
// - onClearAll: a function passed from parent (SalaryPage) to update local state
// - isLoading: optional loading flag for UI state
// ---------------------------------------------------------------------------
const ClearAllSalaryButton = ({ onClearAll, isLoading }) => {
  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will mark all specialists as paid (dummy mode).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        onClearAll(); // trigger parent function
        Swal.fire("Success!", "All salaries marked as paid.", "success");
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
    >
      {isLoading ? "Processing..." : "💰 Clear All Salaries"}
    </button>
  );
};

export default ClearAllSalaryButton;
