import React from "react";
import Axios from 'axios'
import { useToast } from "@chakra-ui/react";
const API_URL = process.env.REACT_APP_API_URL
function TransactionData(data){
    const transaction = data.transaction
    let page = (data.page-1)*5
    let index = data.index+1

    const toast = useToast();
    let time = transaction.created_at;
    let is_approved;

    let userdata = {
        user_id : transaction.user_id
    }

    const approveTransaction = () =>{
        Axios.post(API_URL + `/transaction/approve/${transaction.id}`, userdata)
        .then((respond)=>{
            toast({
                title: 'Transaction Approved',
                description: `An Invoice Email has been sent to User`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        })
        .catch((error)=>{
            toast({
                title: 'Error',
                description: `${error.response.data}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        })
    }

    const rejectTransaction = () =>{
        Axios.post(API_URL + `/transaction/reject/${transaction.id}`, userdata)
        .then((respond)=>{
            toast({
                title: 'A Reject Transaction Email has been sent to User',
                description: `Please refresh to continue`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        })
        .catch((error)=>{
            toast({
                title: 'Error',
                description: `${error.response.data}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        })
    }

    switch(transaction.is_approved){
        case 0:
            is_approved = "Not Approved"
            break;
        case 1:
            is_approved = "Approved"
            break;
        case 2:
            is_approved = "Rejected"
    }
    return (
        <tr className="adminRow">
            <td>{page+index}</td>
            <td>{transaction.inv_number}</td>
            <td>{is_approved}</td>
            <td>{transaction.transaction_statuses_id}</td>
            <td>{time}</td>
            <td>{transaction.payment_proof_path}</td>
            <td>Rp. {transaction.total_payment}</td>
            <td>{transaction.address_id}</td>
            <td>
                {   
                    is_approved == "Not Approved"?
                    <div>
                        <button className="btnAdmin btnSuccessAdmin" onClick={approveTransaction}>Approve</button>
                        <button className="btnAdmin btnErrorAdmin" onClick={rejectTransaction}>Reject</button>
                    </div>
                    :
                    <div>
                    </div>
                }
            </td>
        </tr>
    )
}
export default TransactionData