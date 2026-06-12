import React from 'react'

function TransactionList({transactions, onDelete}) {
  return (
    <div>
      <h2>Recent Transactions:</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} style={{ marginBottom: "10px" }}>
            <strong>{transaction.description}</strong>: ${transaction.amount}
            <span style={{ color: "gray", marginLeft: "10px" }}>
              ({transaction.type})
            </span>

            <button onClick={() => onDelete(transaction.id)}  style={{backgroundColor : "red", color: "white", border: "none", borderRadius: "5px", marginLeft: "10px", padding: "5px 8px"}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList