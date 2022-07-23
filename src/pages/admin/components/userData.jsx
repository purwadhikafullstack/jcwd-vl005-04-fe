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

    const [blockConfirmation, setBlockConfirmation] = useState(false);
    const [unblockConfirmation, setUnblockConfirmation] = useState(false);

    const blockUser = () =>{
        Axios.get(`http://localhost:5000/api/users/block/${users.id}`)
        .then((respond)=>{
            setBlockConfirmation(false);
            toast({
                title: 'Block Success',
                description: `${respond.data}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        })
        .catch((error)=>{
            setBlockConfirmation(false);
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
            setUnblockConfirmation(false);
            toast({
                title: 'Unblock Success',
                description: `${respond.data}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
        })
        .catch((error)=>{
            setUnblockConfirmation(false);
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

    const showBlockConfirmation = () =>{
        setBlockConfirmation(true);
    }

    const showUnblockConfirmation = () =>{
        setUnblockConfirmation(true);
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
                            <button onClick={showBlockConfirmation} className="btnAdmin btnErrorAdmin">Block</button>
                        </div>
                        :
                        <div>
                            <button onClick={showUnblockConfirmation} className="btnAdmin btnSuccessAdmin">Unblock</button>
                        </div>
                    }
                    <div>
                        <button onClick={()=>viewUserTransactions(users.id)} className="btnAdmin btnUtility">View Transactions</button>
                    </div>
                </div>
            </td>
            {
                unblockConfirmation?
                <div className="adminVerificationContainer">
                    <div className="adminVerificationContent">
                        <div className="adminVerificationHeader">
                            <div className="adminVerificationHeaderTitle">
                                Unblock Confirmation
                            </div>
                            <div className="adminVerificationClose" onClick={()=>setUnblockConfirmation(false)}>
                                X
                            </div>
                        </div>
                        <div className="adminVerificationText">
                            Are you sure to Unblock {users.username}?
                        </div>
                        <div className="adminVerificationText">
                            <button className="adminVerificationButton btnSuccessAdmin" onClick={unblockUser}>
                                Yes
                            </button>
                            <button className="adminVerificationButton btnErrorAdmin" onClick={()=>setUnblockConfirmation(false)}>
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
                blockConfirmation?
                <div className="adminVerificationContainer">
                    <div className="adminVerificationContent">
                        <div className="adminVerificationHeader">
                            <div className="adminVerificationHeaderTitle">
                                Block Confirmation
                            </div>
                            <div className="adminVerificationClose" onClick={()=>setBlockConfirmation(false)}>
                                X
                            </div>
                        </div>
                        <div className="adminVerificationText">
                            Are you sure to block {users.username}?
                        </div>
                        <div className="adminVerificationText">
                            <button className="adminVerificationButton btnSuccessAdmin" onClick={blockUser}>
                                Yes
                            </button>
                            <button className="adminVerificationButton btnErrorAdmin" onClick={()=>setBlockConfirmation(false)}>
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
export default UserData;