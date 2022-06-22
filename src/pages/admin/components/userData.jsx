import React from "react";
import Axios from 'axios';
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import "../../../css/admin/adminMain.css"
function UserData(data){
    const users = data.users;
    const toast = useToast();
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
    return (
        <tr>
            <td>{users.id}</td>
            <td>{users.name}</td>
            <td>{users.username}</td>
            <td>{users.email}</td>
            <td>{users.is_verified?"verified":"not verified"}</td>
            <td>{users.is_active?"active":"blocked"}</td>
            <td>
                {users.is_active?
                <button onClick={blockUser} className="btn btnError">Block</button>:
                <button onClick={unblockUser} className="btn btnSuccess">Unblock</button>
            }
            </td>
        </tr>
    )
}
export default UserData;