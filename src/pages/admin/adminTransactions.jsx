import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import "./components/transactionData"
import "../../css/admin/adminMain.css"
import TransactionData from './components/transactionData';
import { useState } from 'react';
function AdminTransaction(){

    const global = useSelector((state)=>state)
    const user = global.user
    const [error, setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let [transactions, setTransactions] = useState("");

    useEffect(()=>{
        Axios.get("http://localhost:5000/api/transaction")
        .then((respond1)=>{
            setTransactions(respond1.data)
        })
        .catch((error)=>{
            console.log(error.response.data)
        })
      },[])
    
    useEffect(()=>{
        const token = localStorage.getItem('admintoken')
        if(!token){
            if(user.role!=="admin" && transactions){
                navigate('/')
            }
        }
    },[])
    

    const generateTransactionData = () =>{
        if(transactions){
            return transactions.map((transaction, index)=>{
                return <TransactionData
                    key = {transaction.id}
                    transaction = {transaction}
                />
            })
        }
    }
    
    return (
        <div className='main'>
            <div className='transactionSub-main'>
                <h1 className='header'>
                    Transactions
                </h1>
                
                <table className='transactionTable'>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>User ID</th>
                            <th>Invoice Number</th>
                            <th>Approved?</th>
                            <th>Transaction Status</th>
                            <th>Created At</th>
                            <th>Payment Proof</th>
                            <th>Total Payment</th>
                            <th>Address ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTransactionData()}
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
}
export default AdminTransaction;