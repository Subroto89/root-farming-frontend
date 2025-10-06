import React from "react";
import InputField from "../../../../shared/InputField/InputField";

export default function SalaryDetails({ specialist}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSave(specialist);
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Salary Details</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <InputField label="Name" value={specialist.name} readOnly />
        <InputField label="ID" value={specialist.id} readOnly />
        <InputField label="Month" value={specialist.month} />
        <InputField label="Previous Due" type="number" value={specialist.previousDue} />
        <InputField label="Fixed Salary" type="number" value={specialist.fixedSalary} />
        <InputField label="Commission" type="number" value={specialist.commission} />
        <InputField label="Deduction Amount" type="number" value={specialist.deductionAmount} />
        <InputField label="Deduction Reason" value={specialist.deductionReason} />
        {/* <InputField label="Net Salary" value={calculateNetSalary(specialist)} readOnly /> */}
        <InputField label="Pay Date" type="date" value={specialist.payDate || ''} />
        <InputField label="Payment Method" value={specialist.paymentMethod} />
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
      </form>
    </div>
  );
}
