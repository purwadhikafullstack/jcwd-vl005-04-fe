import React, { useState } from "react";
import Axios from 'axios'
import { Spinner, useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formatThousands from "format-thousands"

const API_URL = process.env.REACT_APP_API_URL
const socket = io('http://localhost:5001');
let notificationSent = false;

function TransactionData(data){
    const transaction = data.transaction
    let page = (data.page-1)*5
    let index = data.index+1
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    let time = transaction.created_at;
    let is_approved;

    const [approveConfirmation, setApproveConfirmation] = useState(false);
    const [rejectConfirmation, setRejectConfirmation] = useState(false);

    let userdata = {
        user_id : transaction.user_id
    }

    const approveTransaction = () =>{
        if(loading)return;
        setLoading(true);
        Axios.post(API_URL + `/transaction/approve/${transaction.id}`, userdata)
        .then((respond)=>{
            socket.emit('finishTransaction', '')
            setApproveConfirmation(false);
            setLoading(false);
            toast({
                title: 'Transaction Approved',
                description: `An Invoice Email has been sent to User`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        })
        .catch((error)=>{
            setApproveConfirmation(false);
            setLoading(false);
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
        if(loading)return;
        setLoading(true);
        Axios.post(API_URL + `/transaction/reject/${transaction.id}`, userdata)
        .then((respond)=>{
            setRejectConfirmation(false);
            setLoading(false);
            toast({
                title: 'A Reject Transaction Email has been sent to User',
                description: `Please refresh to continue`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        })
        .catch((error)=>{
            setRejectConfirmation(false);
            setLoading(false);
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

    const checkInvoice = (inv) =>{
        navigate("/invoice/"+inv)
    }

    const showApproveConfirmation = () =>{
        setApproveConfirmation(true);
    }

    const showRejectConfirmation = () =>{
        setRejectConfirmation(true);
    }

    return (
        <tr className="adminRow">
            <td>{page+index}</td>
            <td onClick={()=>checkInvoice(transaction.inv_number)} className="selectableTableData">{transaction.inv_number}</td>
            <td>{transaction.status}</td>
            <td>{time}</td>
            <td className="tableDataCenter"><img src={transaction.payment_proof_path} alt="No Image" className="transactionImage"></img></td>
            <td>Rp. {formatThousands(transaction.total_payment, '.')}</td>
            <td>{transaction.address_id}</td>
            <td>
                {   
                    transaction.status == "in_review"?
                    <div>
                        <button className="btnAdmin btnSuccessAdmin" onClick={showApproveConfirmation}>Approve</button>
                        <button className="btnAdmin btnErrorAdmin" onClick={showRejectConfirmation}>Reject</button>
                    </div>
                    :
                    <div>
                    </div>
                }
            </td>
            {
                approveConfirmation?
                <div className="adminVerificationContainer">
                    <div className="adminVerificationContent">
                        <div className="adminVerificationHeader">
                            <div className="adminVerificationHeaderTitle">
                                Approve Confirmation
                            </div>
                            <div className="adminVerificationClose" onClick={()=>setApproveConfirmation(false)}>
                                X
                            </div>
                        </div>
                        <div className="adminVerificationText">
                            Are you sure to Approve Transaction with Invoice {transaction.inv_number}?
                        </div>
                        <div className="adminVerificationText">
                            <button className="adminVerificationButton btnSuccessAdmin" onClick={approveTransaction}>
                                {loading?<Spinner></Spinner>:"Yes"}
                            </button>
                            <button className="adminVerificationButton btnErrorAdmin" onClick={()=>setApproveConfirmation(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div>

                </div>
            }
            {
                rejectConfirmation?
                <div className="adminVerificationContainer">
                    <div className="adminVerificationContent">
                        <div className="adminVerificationHeader">
                            <div className="adminVerificationHeaderTitle">
                                Reject Confirmation
                            </div>
                            <div className="adminVerificationClose" onClick={()=>setRejectConfirmation(false)}>
                                X
                            </div>
                        </div>
                        <div className="adminVerificationText">
                            Are you sure to Reject Transaction with Invoice {transaction.inv_number}?
                        </div>
                        <div className="adminVerificationText">
                            <button className="adminVerificationButton btnSuccessAdmin" onClick={rejectTransaction}>
                            {loading?<Spinner></Spinner>:"Yes"}
                            </button>
                            <button className="adminVerificationButton btnErrorAdmin" onClick={()=>setRejectConfirmation(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div>

                </div>
            }
        </tr>
    )
}
export default TransactionData