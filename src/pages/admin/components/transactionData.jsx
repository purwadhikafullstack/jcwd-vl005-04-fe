import React from "react";
function TransactionData(data){
    const transaction = data.transaction
    let time = transaction.created_at;
    time = time.substring(0,10);
    return (
        <tr>
            <td>{transaction.id}</td>
            <td>{transaction.user_id}</td>
            <td>{transaction.inv_number}</td>
            <td>{transaction.is_approved}</td>
            <td>{transaction.transaction_statuses_id}</td>
            <td>{time}</td>
            <td>{transaction.payment_proof_patd}</td>
            <td>Rp. {transaction.total_payment}</td>
            <td>{transaction.address_id}</td>
        </tr>
    )
}
export default TransactionData