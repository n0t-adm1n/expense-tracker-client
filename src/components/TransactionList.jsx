import React from 'react'

function TransactionList({transactions, onDelete, onEdit}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <h2>Recent Transactions:</h2>
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="p-4 hover:bg-gray-50 flex justify-between items-center transition duration-150">

            <div className='flex flex-col'>
              <span className="font-semibold text-gray-800">{transaction.description}</span>
              <span className="text-sm text-gray-500">{transaction.category}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${parseFloat(transaction.amount).toFixed(2)}
              </span>
              <button onClick={() => onEdit(transaction)} className="text-blue-500 hover:text-blue-700 font-medium text-sm">Edit</button>
              <button onClick={() => onDelete(transaction.id)} className="text-red-500 hover:text-red-700   font-medium text-sm">Delete</button>
              </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList