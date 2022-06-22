import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import "../../css/admin/adminMain.css"
import Axios from 'axios'
import UserData from './components/userData';
import { useState } from 'react';
function AdminViewUser(){
    const global = useSelector((state)=>state)
    const user = global.user
    const [users, setUser] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        let data = {
          transactions : [],
          users_data : []
        }
        Axios.get("http://localhost:5000/api/users")
        .then((respond1)=>{
            setUser(respond1.data)
        })
        .catch((error)=>{
            console.log(error.response.data)
        })
      },[])

      useEffect(()=>{
        const token = localStorage.getItem('admintoken')
        if(!token){
            if(user.role!=="admin" && users){
                navigate('/')
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
    return (
        <div className='main'>
            <div className='transactionSub-main'>
                <h1 className='header'>
                    Users
                </h1>
                
                <table className='transactionTable'>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Verified?</th>
                            <th>Active?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateUsersData()}
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
    
}
export default AdminViewUser;