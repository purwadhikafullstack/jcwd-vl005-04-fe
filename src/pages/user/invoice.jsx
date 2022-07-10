import react, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SidebarMain from "../product/components/sidebar/sidebarMain";
import Header from "./components/header";
import "../../css/invoice.css"
import InvoiceDetail from "./components/invoiceDetail";

function Invoice(){
    const global = useSelector((state)=>state)
    const user = global.user
    const pathname = useLocation().pathname;
    const id = pathname.substring(9,pathname.length)
    const API_URL = process.env.REACT_APP_API_URL

    const [invNumber, setInvNumber] = useState(id);
    const [transaction, setTransaction] = useState();
    const [payment, setPayment] = useState();
    const [transactionDetails, setTransactionDetails] = useState();
    const [orderBy, setOrderBy] = useState();
    const [transactionStatus, setTransactionStatus] = useState();

    
    useEffect(()=>{
        Axios.get(API_URL + `/transaction/invoice/${id}`)
        .then((respond)=>{
            setTransaction(respond.data);
            console.log(respond)
            setInvNumber(respond.data.inv_number)
            setPayment(respond.data.total_payment)
            setTransactionStatus(respond.data.status)
            setOrderBy(respond.data.user_id)
        })
        .catch((error)=>{
            console.log(error)
        })
        Axios.get(API_URL + `/transaction/detail/${id}`)
        .then((respond)=>{
            setTransactionDetails(respond.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    const generateTransactionDetails = () =>{
        if(transactionDetails){
            return transactionDetails.map((detail, index)=>{
                return <InvoiceDetail
                    key = {transaction.id}
                    index = {index}
                    details = {transactionDetails}
                />
            })
        }
    }

    return (
        <div>
            {user.role=="admin"?
                <div>
                    <div className="" style={{ width: "15%" }}>
                        <SidebarMain />
                    </div>
                    <div style={{ width: "85%", marginLeft:"15%"}}>
                        <Header />
                            <div className="invoiceForm">
                                <div className="invoiceContainer">
                                    <div className="invoiceHeader">
                                        <p className="invoiceHeaderLogo">PHARMACY</p>
                                        <p className="invoiceLabel">Invoice Number : {invNumber}</p>
                                        <p className="invoiceLabel">Transaction Status : {transactionStatus}</p>
                                        <p className="invoiceLabel">Order By : {orderBy}</p>

                                    </div>
                                    <div className="invoiceContent">
                                        <table className="invoiceTable">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        No.
                                                    </th>
                                                    <th>
                                                        Product Name
                                                    </th>
                                                    <th>
                                                        Price per Unit
                                                    </th>
                                                    <th>
                                                        Quantity
                                                    </th>
                                                    <th>
                                                        Volume per unit
                                                    </th>
                                                    <th>
                                                        Total Price
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                    {generateTransactionDetails()}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="invoiceFooter">
                                        <div className="invoiceLabel">
                                            Grand Total : Rp. {payment}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                <div>
                    <Header />
                    <div className="invoiceForm">
                        <div className="invoiceContainer">
                            <div className="invoiceHeader">
                                <p className="invoiceHeaderLogo">PHARMACY</p>
                                <p className="invoiceLabel">Invoice Number : {invNumber}</p>
                                <p className="invoiceLabel">Order By : {orderBy}</p>

                            </div>
                            <div className="invoiceContent">
                                <table className="invoiceTable">
                                    <thead>
                                        <tr>
                                            <th>
                                                No.
                                            </th>
                                            <th>
                                                Product Name
                                            </th>
                                            <th>
                                                Price per Unit
                                            </th>
                                            <th>
                                                Quantity
                                            </th>
                                            <th>
                                                Volume per unit
                                            </th>
                                            <th>
                                                Total Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {generateTransactionDetails()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="invoiceFooter">
                                <div className="invoiceLabel">
                                    Grand Total : Rp. {payment}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Invoice;