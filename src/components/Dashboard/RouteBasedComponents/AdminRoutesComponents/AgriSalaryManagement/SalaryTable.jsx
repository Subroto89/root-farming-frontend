import React from "react";
import { useTheme } from "../../../../../hooks/useTheme";

export default function SalaryTable({ specialists, calculateNetSalary, handleSelect, handlePay }) {
  const {theme} = useTheme();
 const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
    const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
    const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light"
  return (
    <div className="overflow-x-auto max-h-[400px] overflow-y-auto border rounded-lg">
      <table className="w-full table-auto text-sm border-collapse">
        <thead className={`${themeBackgroundStyle} sticky top-0`}>
          <tr className="text-center">
            <th className="px-3 py-2 min-w-[40px]">SL</th>
            <th className="px-3 py-2 min-w-[150px]">Name</th>
            <th className="px-3 py-2 min-w-[100px]">ID</th>
            <th className="px-3 py-2 min-w-[120px]">Role</th>
            <th className="px-3 py-2 min-w-[100px]">Fixed</th>
            <th className="px-3 py-2 min-w-[120px]">Commission</th>
            <th className="px-3 py-2 min-w-[100px]">Due</th>
            <th className="px-3 py-2 min-w-[110px]">Deduction</th>
            <th className="px-3 py-2 min-w-[130px]">Net Salary</th>
            <th className="px-3 py-2 min-w-[100px]">Pay Status</th>
            <th className="px-3 py-2 min-w-[150px]">Action</th>
          </tr>
        </thead>

        <tbody className={`${themeFgOfFgStyle}`}>
          {specialists.map((s, idx) => (
            <tr key={s.id} className="border-b hover:bg-gray-500 text-center">
              <td className="px-3 py-2">{idx + 1}</td>
              <td className="px-3 py-2">{s.name}</td>
              <td className="px-3 py-2">{s.id}</td>
              <td className="px-3 py-2">{s.role}</td>
              <td className="px-3 py-2">$ {s.fixed}</td>
              <td className="px-3 py-2">$ {s.commission}</td>
              <td className="px-3 py-2">$ {s.due}</td>
              <td className="px-3 py-2">$ {s.deduction}</td>
              <td className="px-3 py-2">$ {calculateNetSalary(s).toLocaleString()}</td>
              <td className="px-3 py-2">
                {s.paid ? (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Paid
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                    Unpaid
                  </span>
                )}
              </td>
              <td className="px-3 py-2 space-x-2">
                <button
                  className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                  onClick={() => handleSelect(s.id)}
                >
                  View
                </button>
                <button
                  className="px-3 py-1 rounded bg-green-600 text-white text-sm disabled:opacity-50"
                  onClick={() => handlePay(s)}
                  disabled={s.paid}
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
