import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { backgroundColor: "#fff", padding: 20, fontSize: 12, color: "#333" },
  title: { fontSize: 18, marginBottom: 15, textAlign: "center", fontWeight: "bold" },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    color: "white",
    paddingVertical: 5,
    marginBottom: 5,
  },
  tableRow: { flexDirection: "row", borderBottom: "1px solid #ddd", paddingVertical: 4 },
  col: { width: "14%", textAlign: "center" },
});

const SalaryReportDocument = ({ specialists, month, calculateNetSalary }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Agri Salary Report – {month}</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.col}>Name</Text>
        <Text style={styles.col}>Role</Text>
        <Text style={styles.col}>Fixed</Text>
        <Text style={styles.col}>Commission</Text>
        <Text style={styles.col}>Due</Text>
        <Text style={styles.col}>Deduction</Text>
        <Text style={styles.col}>Net Salary</Text>
      </View>

      {specialists?.map((s, idx) => (
        <View style={styles.tableRow} key={idx}>
          <Text style={styles.col}>{s.name}</Text>
          <Text style={styles.col}>{s.role}</Text>
          <Text style={styles.col}>${s.fixed}</Text>
          <Text style={styles.col}>${s.commission}</Text>
          <Text style={styles.col}>${s.due}</Text>
          <Text style={styles.col}>${s.deduction}</Text>
          <Text style={styles.col}>${calculateNetSalary(s).toLocaleString()}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default SalaryReportDocument;
