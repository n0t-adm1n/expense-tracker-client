import { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import Form from "./components/Form";

function App() {
  const [transactions, setTransactions] = useState([]);

  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleEditClick = (transaction) => {
    console.log("Editing");
    setEditingTransaction(transaction);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    // Swap the old transaction for the new one in the list
    setTransactions(transactions.map(transaction => 
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    ));
    // Clear the editing memory so the form goes back to normal
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method : "DELETE",
      });

      if(res.ok) {
        setTransactions(transactions.filter( t => t.id !== id));
      }
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>My Expense Tracker</h1>
      
      <TransactionList 
            transactions={transactions} 
            onDelete={handleDeleteTransaction} 
            onEdit = {handleEditClick}      
      />
      
      <Form 
        onAddTransaction={handleAddTransaction} 
        editingTransaction={editingTransaction}
        onUpdateTransaction= {handleUpdateTransaction}  
      />
    </div>
  );
}

export default App;