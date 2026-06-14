import React from 'react'
import { useState, useEffect } from 'react';

function Form({onAddTransaction, editingTransaction, onUpdateTransaction, onCancelEdit}) {

	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [type, setType] = useState("expense");

	useEffect(() => {
		if (editingTransaction) {
			setAmount(editingTransaction.amount);
			setDescription(editingTransaction.description);
			setCategory(editingTransaction.category);
			setType(editingTransaction.type);
		}
 	}, [editingTransaction]);

	const handleSubmit = async(e) => {
		e.preventDefault();

		const newTransaction = { amount: parseFloat(amount), description, category, type };

		try {
			const url = editingTransaction 
						? `http://localhost:5000/api/transactions/${editingTransaction.id}`
        				: "http://localhost:5000/api/transactions";
			const method = editingTransaction ? 'PUT' : 'POST'

			const response = await fetch(url, {
				method: method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newTransaction),
      		});

			if (response.ok) {
				const savedTransaction = await response.json();
				
				if (editingTransaction) {
					onUpdateTransaction(savedTransaction);
				} else {
					onAddTransaction(savedTransaction);
				}
        
       			setAmount(""); 
				setDescription(""); 
				setCategory("");
      		}

		} catch (err) {
			console.error("Error occured: ", err);
		}
	};


	const handleCancel = () => {
		setAmount("");
		setDescription("");
		setCategory("");
		setType("expense");

		onCancelEdit();
	}

	return (
		<form onSubmit={handleSubmit} style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc" }}>
			<h3>{editingTransaction ? "Edit Transaction" : "Add New Transaction"}</h3>
			<input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required style={{ marginRight: "10px" }} />
			<input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ marginRight: "10px" }} />
			<input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required style={{ marginRight: "10px" }} />
			<select value={type} onChange={(e) => setType(e.target.value)} style={{ marginRight: "10px" }}>
				<option value="expense">Expense</option>
				<option value="income">Income</option>
			</select>
			<button type="submit">Add</button>

			{editingTransaction && <button type="reset" onClick={handleCancel}>Cancel</button>}
    </form>
	)
}

export default Form