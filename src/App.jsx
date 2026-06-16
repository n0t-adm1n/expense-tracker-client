import { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import Form from "./components/Form";
import DashBoard from "./components/DashBoard";

function App() {
  const [transactions, setTransactions] = useState([]);
  
  const [filter, setFilter] = useState('all');
  
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    ));
    
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

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredTransaction = transactions.filter((transaction) => {
    if(filter === "all") {
      return true;
    } else {
      return transaction.type === filter;
    }
  })

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>My Expense Tracker</h1>
      
      <DashBoard transactions={transactions} />

      <Form 
        onAddTransaction={handleAddTransaction} 
        editingTransaction={editingTransaction}
        onUpdateTransaction= {handleUpdateTransaction}  
        onCancelEdit = {handleCancelEdit}   
      />

      <div style={{ marginBottom: "20px", textAlign: "right" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filter by:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: "5px" }}>
          <option value="all">All</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
        </select>
      </div>
      
      <TransactionList 
            transactions={filteredTransaction} 
            onDelete={handleDeleteTransaction} 
            onEdit = {handleEditClick}   
      />
    </div>
  );
}

export default App;