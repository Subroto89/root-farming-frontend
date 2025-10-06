import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown } from "lucide-react";
import SalaryReportPDF from "./SalaryReportPDF";

const DownloadReportButton = ({ specialists, month, calculateNetSalary }) => {
  if (!specialists?.length) return null;

  return (
    <PDFDownloadLink
      document={
        <SalaryReportPDF
          specialists={specialists}
          month={month}
          calculateNetSalary={calculateNetSalary}
        />
      }
      fileName={`Agri_Salary_Report_${month.replace(" ", "_")}.pdf`}
    >
      {({ loading }) => (
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2">
          <FileDown size={18} />
          {loading ? "Preparing PDF..." : "Download Report"}
        </button>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadReportButton;
