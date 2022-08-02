import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import "../../css/admin/adminMain.css"
import Axios from 'axios'
import UserData from './components/userData';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import Header from '../user/components/header';
import SidebarMain from '../product/components/sidebar/sidebarMain';

const API_URL = process.env.REACT_APP_API_URL
function AdminViewUser(){
    const global = useSelector((state)=>state)
    const user = global.user
    const [users, setUser] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const [count, setCount] = useState(0);
    
    const [page, setPage] = useState(1);

    useEffect(()=>{
        Axios.get(API_URL + `/users?_page=${page}`)
        .then((respond1)=>{
            setUser(respond1.data.user)
            setCount(respond1.data.total)
        })
        .catch((error)=>{
            console.log(error)
        })
      },[page])

      useEffect(()=>{
        const token = localStorage.getItem('admintoken')
        if(!token){
            if(user.role!=="admin" && users){
                navigate('/admin')
            }
        }
    },[])
    const generateUsersData = () =>{
        if(users){
            return users.map((user, index)=>{
                return <UserData
                    key = {user.id}
                    users = {user}
                />
            })
        }
    }

    const prevPage = () =>{
        if(page > 1)setPage(page-1)
    }

    const nextPage = () =>{
        if(page < Math.floor(count/5)+1)setPage(page+1)
    }

    return (
        <div>
            <div className="d-flex" style={{ height: "100vh" }}>
                <div className="" style={{ width: "15%" }}>
                    <SidebarMain />
                </div>
                <div style={{ width: "85%" }}>
                    <Header />
                    <div>
                        <div className='main'>
                            <div className='transactionSub-main'>
                                <h1 className='header'>
                                    Users
                                </h1>
                                <div className="dataController">
                                </div>
                                <table className='transactionTable'>
                                    <thead>
                                        <tr className="adminRow">
                                            <th>User ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Verified?</th>
                                            <th>Active?</th>
                                            <th colSpan={2}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {generateUsersData()}
                                    </tbody>
                                    
                                </table>
                                <div className='pageController'>
                                    <button onClick={prevPage} className="btnPage">{"<"}</button>
                                    Page {page} of {Math.floor(count/5)+1}
                                    <button onClick={nextPage} className="btnPage">{">"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
    
}
export default AdminViewUser;