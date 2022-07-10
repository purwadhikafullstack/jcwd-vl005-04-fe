import React from "react";
import Axios from 'axios'
import { useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL
const socket = io('http://localhost:5001');
let notificationSent = false;

function TransactionData(data){
    const transaction = data.transaction
    let page = (data.page-1)*5
    let index = data.index+1
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();

    const toast = useToast();
    let time = transaction.created_at;
    let is_approved;

    let userdata = {
        user_id : transaction.user_id
    }

    const approveTransaction = () =>{
        Axios.post(API_URL + `/transaction/approve/${transaction.id}`, userdata)
        .then((respond)=>{
            socket.emit('finishTransaction', '')
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

    socket.on('confirmasiCheckOutBerhasil', (arg) => {
        if (user.role == "admin" && !notificationSent) {
            notificationSent = true;
            toast({
                title: "Transaction Success",
                description: arg,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    })

    // switch(transaction.is_approved){
    //     case 0:
    //         is_approved = "Not Approved"
    //         break;
    //     case 1:
    //         is_approved = "Approved"
    //         break;
    //     case 2:
    //         is_approved = "Rejected"
    // }
    return (
        <tr className="adminRow">
            <td>{page+index}</td>
            <td>{transaction.inv_number}</td>
            <td>{transaction.status}</td>
            <td>{time}</td>
            <td><img src={transaction.payment_proof_path} alt="No Image"></img></td>
            <td>Rp. {transaction.total_payment}</td>
            <td>{transaction.address_id}</td>
            <td>
                {   
                    transaction.status == "in_review"?
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