import { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import Form from "./components/Form";

function App() {
  const [transactions, setTransactions] = useState([]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
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
      
      <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
      
      <Form onAddTransaction={handleAddTransaction} />
    </div>
  );
}

export default App;