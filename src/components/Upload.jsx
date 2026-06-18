import { useState } from "react";
import * as XLSX from "xlsx";

function Upload({ onBulkUpload }) {
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const formattedData = mapData(jsonData);
        sendToBackend(formattedData);
        
      } catch (err) {
        setError("Error parsing file. Please make sure it is a valid Excel file.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // THE DATA MAPPER
  const mapData = (excelRows) => {
    const mapped = excelRows.map((row) => {
      let type = "expense";
      let amount = 0;

      if (row["Credit"] && parseFloat(row["Credit"]) > 0) {
        type = "income";
        amount = parseFloat(row["Credit"]);
      } else if (row["Debit"] && parseFloat(row["Debit"]) > 0) {
        type = "expense";
        amount = parseFloat(row["Debit"]);
      }

      return {
        amount: amount,
        description: row["Activity"] || row["Narration"] || row["Details"] || "Paytm Transaction",
        category: "Paytm Upload", 
        type: type,
      };
    });

    return mapped.filter((transaction) => transaction.amount > 0);
  };

  const sendToBackend = async (transactions) => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactions),
      });

      if (response.ok) {
        const savedTransactions = await response.json();
        onBulkUpload(savedTransactions); 
        setError("");
        alert("Successfully uploaded Paytm transactions!");
      }
    } catch (err) {
      setError("Failed to save transactions to the database.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Paytm Statement (Excel)</h3>
      <input 
        type="file" 
        accept=".xls,.xlsx" 
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default Upload;