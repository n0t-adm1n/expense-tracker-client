import React from 'react'

function TransactionList({transactions}) {
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList