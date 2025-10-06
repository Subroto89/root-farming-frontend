import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import SalaryTable from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/AgriSalaryManagement/SalaryTable";
import SalaryDetails from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/AgriSalaryManagement/SalaryDetails";
import DownloadPDFButton from "../../../../components/Dashboard/RouteBasedComponents/AdminRoutesComponents/AgriSalaryManagement/DownloadReportButton";

// Axios instance with base URL (for future use)
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Calculate total/net salary
const calculateNetSalary = ({ fixed = 0, commission = 0, due = 0, deduction = 0 }) => {
  const f = Number(fixed) || 0;
  const c = Number(commission) || 0;
  const d = Number(due) || 0;
  const det = Number(deduction) || 0;
  return f + c + d - det;
};

export default function SpecialistsSalary() {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState(null);

  // 🧾 Dummy Specialists (temporary mock data)
  const dummySpecialists = [
    {
      id: "1",
      name: "Dr. Ahsan Rahman",
      role: "Soil Fertility Expert",
      fixed: 30000,
      commission: 5000,
      due: 2000,
      deduction: 1000,
      paid: false,
    },
    {
      id: "2",
      name: "Dr. Nusrat Jahan",
      role: "Irrigation Specialist",
      fixed: 28000,
      commission: 4000,
      due: 1000,
      deduction: 500,
      paid: true,
      payDate: "2025-09-28",
      paymentMethod: "Cash",
    },
    {
      id: "3",
      name: "Dr. Tanvir Ahmed",
      role: "Agri Consultant",
      fixed: 32000,
      commission: 3000,
      due: 1500,
      deduction: 700,
      paid: false,
    },
  ];

  const specialists = dummySpecialists;

  const mutationUpdate = useMutation({
    mutationFn: async (payload) => {
      console.log("Mock Update:", payload);
      return payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialists"] });
      toast.success("Salary updated successfully!");
    },
  });

  const selected = specialists.find((s) => s.id === selectedId);

  const handleSelect = (id) => setSelectedId(id);

  const handlePay = (specialist) => {
    Swal.fire({
      title: `Pay ${specialist.name}?`,
      text: `Proceed to pay ${specialist.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay",
    }).then((res) => {
      if (res.isConfirmed) {
        const today = new Date().toISOString().slice(0, 10);
        mutationUpdate.mutate({
          ...specialist,
          paid: true,
          payDate: today,
          paymentMethod: "Cash",
        });
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agri-Specialists' Salary</h1>
        <button
          onClick={() => {
            Swal.fire({
              title: "Clear all unpaid salaries?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, clear all",
            }).then((res) => {
              if (res.isConfirmed) {
                specialists
                  .filter((s) => !s.paid)
                  .forEach((s) => {
                    const today = new Date().toISOString().slice(0, 10);
                    mutationUpdate.mutate({
                      ...s,
                      paid: true,
                      payDate: today,
                      paymentMethod: "Cash",
                    });
                  });
                toast.success("All unpaid salaries cleared");
              }
            });
          }}
          className="px-4 py-2 rounded bg-yellow-500 text-white"
        >
          Clear All Salaries
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-4">
          <div className="flex justify-between items-center mb-4"> 
           <DownloadPDFButton 
           specialists={specialists || []}
           calculateNetSalary={calculateNetSalary} 
           month="October 2025" />
          </div>

          <SalaryTable
            specialists={specialists}
            calculateNetSalary={calculateNetSalary}
            handleSelect={handleSelect}
            handlePay={handlePay}
            selectedId={selectedId}
          />
        </div>

        <div className="lg:col-span-1">
          {selected ? (
            <SalaryDetails
              specialist={selected}
              calculateNetSalary={calculateNetSalary}
              onSave={(data) =>
                mutationUpdate.mutate({
                  ...data,
                  netSalary: calculateNetSalary(data),
                })
              }
            />
          ) : (
            <p className="text-gray-500 text-center mt-10">
              Select a specialist to see details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
