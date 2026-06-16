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
		<form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-md mb-8 '>
			<h3 className='text-xl font-bold text-gray-800 mb-4 '>{editingTransaction ? "Edit Transaction" : "Add New Transaction"}</h3>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
				<input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select value={type} onChange={(e) => setType(e.target.value)} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
			</div>

			<div className='flex gap-3'>
				<button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 '>
					{editingTransaction ? "Update" : "Add"}
				</button>
				{editingTransaction && <button type="reset" onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition duration-200">Cancel</button>}
			</div>
    </form>
	)
}

export default Form