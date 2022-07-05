import React, {useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'
import "./components/transactionData"
import "../../css/admin/adminMain.css"
import TransactionData from './components/transactionData';
import { useState } from 'react';
import { Icon, useToast } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';

const API_URL = process.env.REACT_APP_API_URL

function AdminTransaction(){
    
    const global = useSelector((state)=>state)
    const user = global.user
    const [error, setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sort, setSort] = useState("DESC")
    const [filter,setFilter] = useState("All")
    const [count, setCount] = useState(0)

    let [transactions, setTransactions] = useState("");

    const [page, setPage] = useState(1);

    const startYear = useRef();
    const endYear = useRef();
    const startMonth = useRef();
    const endMonth = useRef();
    const toast = useToast();

    useEffect(()=>{
        if(filter==="Custom"){
            Axios.get(API_URL + `/transaction?_page=${page}&&_sortDate=${sort}&&_filterDate=${filter}&&_filterCustomMonthStart=${startMonth.current.value}&&_filterCustomMonthEnd=${endMonth.current.value}&&_filterCustomYearStart=${startYear.current.value}&&_filterCustomYearEnd=${endYear.current.value}`)
            .then((respond)=>{
                setTransactions(respond.data.transaction)
                setCount(respond.data.total)
            })
            .catch((error)=>{
                console.log(error.response.data)
            })
        }
        else{
            Axios.get(API_URL + `/transaction?_page=${page}&&_sortDate=${sort}&&_filterDate=${filter}`)
            .then((respond)=>{
                setTransactions(respond.data.transaction)
                setCount(respond.data.total)
            })
            .catch((error)=>{
                console.log(error.response.data)
            })
        }
      },[page])
    
      useEffect(()=>{
        Axios.get(API_URL + `/transaction?_page=${page}&&_sortDate=${sort}&&_filterDate=${filter}`)
        .then((respond)=>{
            setTransactions(respond.data.transaction)
            setCount(respond.data.total)
            setPage(1)
        })
        .catch((error)=>{
            console.log(error.response.data)
        })
    },[sort])

    useEffect(()=>{
        Axios.get(API_URL + `/transaction?_page=${page}&&_sortDate=${sort}&&_filterDate=${filter}`)
        .then((respond)=>{
            setTransactions(respond.data.transaction)
            setCount(respond.data.total)
            setPage(1)
        })
        .catch((error)=>{
            console.log(error.response.data)
        })
    },[filter])

    useEffect(()=>{
        const token = localStorage.getItem('admintoken')
        if(!token){
            if(user.role!=="admin" && transactions){
                navigate('/')
            }
        }
    },[])

    const prevPage = () =>{
        if(page > 1)setPage(page-1)
    }

    const nextPage = () =>{
        if(page < Math.ceil(count/5))setPage(page+1)
    }

    const generateTransactionData = () =>{
        if(transactions){
            return transactions.map((transaction, index)=>{
                return <TransactionData
                    key = {transaction.id}
                    transaction = {transaction}
                    page = {page}
                    index = {index}
                />
            })
        }
    }
    
    const onSubmitSearchButton = () =>{
        const startMonthData = startMonth.current.value;
        const endMonthData = endMonth.current.value;
        const startYearData = startYear.current.value;
        const endYearData = endYear.current.value;
        if(startYearData==""||endYearData==""){
            toast({
                title: 'Invalid Year Input',
                description: 'Year cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return
        }
        if(startMonthData<1||startMonthData>12||endMonthData<1||endMonthData>12){
            toast({
                title: 'Invalid Month Input',
                description: 'Month must between 1 and 12',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return
        }
        Axios.get(API_URL + `/transaction?_page=${page}&&_sortDate=${sort}&&_filterDate=${filter}&&_filterCustomMonthStart=${startMonthData}&&_filterCustomMonthEnd=${endMonthData}&&_filterCustomYearStart=${startYearData}&&_filterCustomYearEnd=${endYearData}`)
        .then((respond)=>{
            setTransactions(respond.data.transaction)
            setCount(respond.data.total)
            setPage(1)
        })
        .catch((error)=>{
            console.log(error.response.data)
        })
    }

    return (
        <div className='main'>
            <div className='transactionSub-main'>
                <h1 className='header'>
                    All Transactions
                </h1>
                <div className="dataController">
                        <div className="dataControllerDropdown">
                            <div className="dataControllerDropdownHeader">
                                {sort=="DESC"?"Sort : Date - New to Old":"Sort : Date - Old to New"}
                                <Icon as={ChevronDownIcon} ml={3} mt={0}/>
                            </div>
                            <div className="dataControllerDropdownContent">
                                <button className="dataControllerDropdownButton" onClick={()=>setSort("DESC")}>
                                    Date - New to Old
                                </button>
                                <button className="dataControllerDropdownButton" onClick={()=>setSort("ASC")}>
                                    Date - Old to New
                                </button>
                            </div>
                        </div>
                        <div className="dataControllerDropdown">
                            <div className="dataControllerDropdownHeader">
                                Filter : {filter}
                                <Icon as={ChevronDownIcon} ml={3} mt={0}/>
                            </div>
                            <div className="dataControllerDropdownContent">
                                <button className="dataControllerDropdownButton" onClick={()=>setFilter("Custom")}>
                                    Custom Range
                                </button>
                                <button className="dataControllerDropdownButton" onClick={()=>setFilter("Week")}>
                                    This Week
                                </button>
                                <button className="dataControllerDropdownButton" onClick={()=>setFilter("Month")}>
                                    This Month
                                </button>
                                <button className="dataControllerDropdownButton" onClick={()=>setFilter("Year")}>
                                    This Year
                                </button>
                                <button className="dataControllerDropdownButton" onClick={()=>setFilter("All")}>
                                    All
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                            filter=="Custom"?
                            <div className="dataInputContainer">
                                <div className="dataInputForm">
                                    <div className="dataInputLabel">
                                        Start Year
                                    </div>
                                    <input type="number" ref={startYear} className="dataControllerDropdown dataControllerInput" placeholder="2022" maxLength="4"></input>
                                    <div className="dataInputLabel">
                                        Start Month
                                    </div>
                                    <input type="number" ref={startMonth} className="dataControllerDropdown dataControllerInput" placeholder="01" maxLength="4"></input>
                                    <button className="btnSearch" onClick={onSubmitSearchButton}>Search</button>
                                
                                </div>

                                <div className="dataInputForm">
                                    <div className="dataInputLabel">
                                        End Year
                                    </div>
                                    <input type="number" ref={endYear} className="dataControllerDropdown dataControllerInput" placeholder="2022" maxLength="4"></input>
                                    <div className="dataInputLabel">
                                        End Month
                                    </div>
                                    <input type="number" ref={endMonth} className="dataControllerDropdown dataControllerInput" placeholder="01" maxLength="4"></input>
                                </div>
                            </div>
                            :
                            <div>
                                
                            </div>
                        }
                <table className='transactionTable'>
                    <thead>
                        <tr className="adminRow">
                            <th>No</th>
                            <th>Invoice Number</th>
                            <th>Approved?</th>
                            <th>Transaction Status</th>
                            <th>Created At</th>
                            <th>Payment Proof</th>
                            <th>Total Payment</th>
                            <th>Address ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTransactionData()}
                    </tbody>
                    
                </table>
                <div className='pageController'>
                    <button onClick={prevPage} className="btnPage">{"<"}</button>
                    Page {page} of {Math.ceil(count/5)}
                    <button onClick={nextPage} className="btnPage">{">"}</button>
                </div>
            </div>
        </div>
    )
}
export default AdminTransaction;