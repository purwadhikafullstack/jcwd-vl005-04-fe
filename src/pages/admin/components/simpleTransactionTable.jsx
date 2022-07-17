import React from 'react'
import formatThousands from "format-thousands"
function SimpleTransactionTable(data){
    const transaction = data.transaction
    const index = data.index
    return (
        <tr>
            <td>{index+1}</td>
            <td>{transaction.created_at}</td>
            <td>{transaction.status}</td>
            <td>Rp. {formatThousands(transaction.total_payment, '.')}</td>
        </tr>
    )
}
export default SimpleTransactionTable;