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
        <div className="flex justify-between bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
            <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Total Balance</h3>
                <h2 className={`text-3xl font-bold ${balance >= 0 ? "text-gray-900" : "text-red-500"}`}>
                ${balance.toFixed(2)}
                </h2>
            </div>
            <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Income</h3>
                <h2 className="text-3xl font-bold text-green-500">${totalIncome.toFixed(2)}</h2>
            </div>
            <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Expenses</h3>
                <h2 className="text-3xl font-bold text-red-500">${totalExpenses}</h2>
            </div>
        </div>
  )
}

export default DashBoard