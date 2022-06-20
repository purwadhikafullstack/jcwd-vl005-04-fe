import React, { useRef, useState } from "react";
import Axios from 'axios';
import {useToast} from '@chakra-ui/react'

function AdminForgetPassword (){
    const email = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const sendVerificationEmail = () =>{
        setErrorMessage("");
        setLoading(true);
        const data = {
            email : email.current.value
        }
        Axios.post("http://localhost:5000/api/admin/forget-password",data)
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
    )
}
export default AdminForgetPassword