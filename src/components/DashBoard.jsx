import React from 'react'

function DashBoard({transactions}) {

	
	const totalIncome = transactions
	.filter(transaction => transaction.type === "income")
	.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
	
	const totalExpenses = transactions
	.filter(transaction => transaction.type === "expense")
	.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
	
	const balance = totalIncome - totalExpenses;
	

  return (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #ccc" }}>
            <div>
                <h3 style={{ margin: 0 }}>Total Balance</h3>
                <h2 style={{ margin: 0, color: balance >= 0 ? "black" : "red" }}>
                ${balance.toFixed(2)}
                </h2>
            </div>
            <div>
                <h3 style={{ margin: 0, color: "green" }}>Income</h3>
                <h2 style={{ margin: 0, color: "black" }}>${totalIncome.toFixed(2)}</h2>
            </div>
            <div>
                <h3 style={{ margin: 0, color: "red" }}>Expenses</h3>
                <h2 style={{ margin: 0 , color: "black"}}>${totalExpenses}</h2>
            </div>
        </div>
  )
}

export default DashBoard