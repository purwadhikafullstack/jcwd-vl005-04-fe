import React, { useRef, useState } from "react";
import Axios from 'axios';
import {useToast} from '@chakra-ui/react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../user/components/header";

const API_URL = process.env.REACT_APP_API_URL
function AdminForgetPassword (){
    const global = useSelector((state)=>state)
    const user = global.user
    const email = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    if(user.email){
        navigate('/')
    }

    const sendVerificationEmail = () =>{
        setErrorMessage("");
        setLoading(true);
        const data = {
            email : email.current.value
        }
        Axios.post(API_URL + "/admin/forget-password",data)
        .then((respond)=>{
            console.log(respond.data)
            setErrorMessage("A Verification Email has been Sent, Please Check your email")
            toast({
                title: 'Email Sent',
                description: 'A Verification Email has been Sent, Please Check your email',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
            setLoading(false);
        })
        .catch((error)=>{
            toast({
                title: 'Error',
                description: `${error.response.data}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            setErrorMessage(error.response.data)
            setLoading(false);
        })
    }
    return (
        <div>
            <Header/>
            <div className="main">
                <div className="sub-main">
                    <div className="resetContainer">
                        <h1 className="loginHeader">
                            Forget Password
                        </h1>
                        <div className="inputForm">
                            <input type = "text" className="nameSmallPadding" ref={email} placeholder="Email"></input>
                        </div>
                        {errorMessage}
                        <button className="submitButton submitButtonReset" onClick={sendVerificationEmail}>
                            Send Verification Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default AdminForgetPassword