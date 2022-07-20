import React from "react";
import Axios from 'axios';
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import "../../../css/admin/adminMain.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function UserData(data){
    const users = data.users;
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState(0);

    const blockUser = () =>{
        Axios.get(`http://localhost:5000/api/users/block/${users.id}`)
        .then((respond)=>{
            toast({
                title: 'Block Success',
                description: `${respond.data}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        })
        .catch((error)=>{
            toast({
                title: 'Block Error',
                description: `${error.response.data}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        })
    }
    const unblockUser = () =>{
        Axios.get(`http://localhost:5000/api/users/unblock/${users.id}`)
        .then((respond)=>{
            toast({
                title: 'Unblock Success',
                description: `${respond.data}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        })
        .catch((error)=>{
            toast({
                title: 'Unblock Error',
                description: `${error.response.data}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        })
    }

    const viewUserTransactions = (id) =>{
        navigate(`/admin/user-transactions/${id}`)
    }

    return (
        <tr className="adminRow">
            <td>{users.id}</td>
            <td>{users.username}</td>
            <td>{users.email}</td>
            <td>{users.verification?"verified":"not verified"}</td>
            <td>{users.is_active?"active":"blocked"}</td>
            <td>
                <div className="flexbox">
                    {users.is_active?
                        <div>
                            <button onClick={blockUser} className="btnAdmin btnErrorAdmin">Block</button>
                        </div>
                        :
                        <div>
                            <button onClick={unblockUser} className="btnAdmin btnSuccessAdmin">Unblock</button>
                        </div>
                    }
                    <div>
                        <button onClick={()=>viewUserTransactions(users.id)} className="btnAdmin btnUtility">View Transactions</button>
                    </div>
                </div>
            </td>
        </tr>
    )
}
export default UserData;