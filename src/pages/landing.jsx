import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client";
import Axios from 'axios';
import SidebarItem from "./product/components/sidebar/sidebarItem";
import SidebarMain from "./product/components/sidebar/sidebarMain";
import Header from "./user/components/header";
import "../css/admin/adminLanding.css"
import { useEffect, useState } from "react";
import moment from "moment";
import SimpleTransactionTable from "./admin/components/simpleTransactionTable";

const socket = io('http://localhost:5001');
const API_URL = process.env.REACT_APP_API_URL
function Landing(){
    const [date, setDate] = useState(moment());
    const [report, setReport] = useState("");
    const [topProducts, setTopProducts] = useState("");
    const global = useSelector((state)=>state)
    const [transactions, setTransactions] = useState(); 
    const user = global.user
    const toast = useToast();
    let randomMessage = "Test";
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const currdate = new Date().toString();
    const rngdate = currdate.substring(23,24)

    if(rngdate%2==0){
        randomMessage = "Honesty is da best policey"
    }
    else{
        randomMessage = "Greed is bad, got it?"
    }

    const onLogout = () =>{
        dispatch ({type : 'ADMIN_LOGOUT'})
        navigate('/admin');
    }
    useEffect(()=>{
        Axios.get(API_URL + `/transaction?_page=1&&_sortDate=DESC`)
        .then((respond)=>{
            setTransactions(respond.data.transaction)
        })
        .catch((error)=>{
            console.log(error.response.data)
        })
        Axios.post(API_URL + "/admin/report", {
            date: date.format("YYYY-MM-DD"),
            // date: "2022-07-01",
          })
            .then((res) => {
              setReport(res.data)
              setTopProducts(res.data.top_products)
            })
            .catch((error) => {
              console.log(error.response.data);
            });
    },[])
    
    const generateTransactionTable = () =>{
        if(transactions){
            return transactions.map((transaction, index)=>{
                return <SimpleTransactionTable
                    key = {transaction.id}
                    transaction = {transaction}
                    index = {index}
                />
            })
        }
    }

    const generateTopProducts = () =>{
        if(topProducts){
            return topProducts.map((topProduct,index)=>{
                return <li className="adminLandingContentLabel">
                    {topProduct.product_name}
                </li>
            })
        }
    }

    return (
        <div>
            <div className="" style={{ width: "15%" }}>
                <SidebarMain />
            </div>
            <div style={{ width: "85%", marginLeft:"15%"}}>
                <Header />
                <div className="adminLandingContainer">
                    <div className="adminLandingContent">
                        <div className="adminLandingGroup">
                            <div className="adminLandingContentFull">
                                <p className="adminLandingContentHeader">Welcome, {user.username}!</p>
                                <p className="adminLandingContentText">"{randomMessage}" -Wise People</p>
                                
                            </div>
                        </div>
                        <div className="adminLandingGroupDouble">
                            <div className="adminLandingContentHalf adminLandingContentClickable" onClick={()=>navigate('/admin/report')}>
                                <p className="adminLandingContentHeader">Today's Report</p>
                                <p className="adminLandingContentText">Gross : {report.gross}</p>
                                <p className="adminLandingContentText">Profit : {report.profit}</p>
                                <p className="adminLandingContentText">Top Products : </p>
                                {generateTopProducts()}
                            </div>
                            <div className="adminLandingContentHalf adminLandingContentClickable" onClick={()=>navigate('/admin/transaction')}>
                            <p className="adminLandingContentHeader">Recent Transactions</p>
                            <div className="adminFullFlex">
                                <table className="transactionTable">
                                    <thead>
                                        <tr className="adminRow">
                                            <th>
                                                No.
                                            </th>
                                            <th>
                                                Created At
                                            </th>
                                            <th>
                                                Status
                                            </th>
                                            <th>
                                                Total Payment
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {generateTransactionTable()}
                                    </tbody>
                                </table>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing