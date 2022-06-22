import { useToast } from "@chakra-ui/react";
import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios'
import "../../css/admin/loginregister.css"

function AdminResetPassword (){
    const password = useRef();
    const [errorMessage, setErrorMessage] = useState("")
    const repassword = useRef();
    const toast = useToast();
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const id = pathname.substring(22,pathname.length)

    const changePassword = () =>{
        setErrorMessage("")
        if(!password.current.value){
            setErrorMessage("Password must be filled")
            return toast({
                title: `${errorMessage}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
        if(!repassword.current.value){
            setErrorMessage("Re-Password must be filled")
            return toast({
                title: `${errorMessage}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
        if(password.current.value !== repassword.current.value){
            setErrorMessage("Password and Repassword must be same")
            return toast({
                title: `${errorMessage}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }

        const data = {
            id : id,
            password : password.current.value
        }
        Axios.post("http://localhost:5000/api/admin/reset-password", data)
        .then((respond)=>{
            setErrorMessage("")
            toast({
                title: `Change password success`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
            return navigate("/admin")
        })
        .catch((error)=>{
            console.log(error.response.data)

        })
    }

    return (
        <div className="main">
            <div className="sub-main">
                <div className="resetContainer">
                    <h1 className="loginHeader">
                        Reset Password
                    </h1>

                    <div className="inputForm">
                        <input type = "password" className="name" ref = {password} placeholder="Password">

                        </input>

                    </div>
                    <div className="inputForm">
                        <input type = "password" className="name" ref = {repassword} placeholder="Re-Enter Password">

                        </input>
                    </div>

                    <button className="submitButton submitButtonReset" onClick={changePassword}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AdminResetPassword