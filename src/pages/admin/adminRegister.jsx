import { useToast } from "@chakra-ui/react";
import  Axios  from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profile from "../../images/a.png";
function AdminRegister(){
    const toast = useToast();
    const navigate = useNavigate();
    const global = useSelector((state)=>state);
    const user = global.user

    const name = useRef();
    const username = useRef();
    const email = useRef();
    const password = useRef();

    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(()=>{
        const token = localStorage.getItem('admintoken')
        if(!token){
            if(user.role!=="admin"){
                navigate('/')
            }
        }
    },[])
      
    if(user.role!=="admin")navigate('/')
    
    const registerAdmin = () =>{
        if(!name.current.value){
            return toast({
                title: 'Login Error',
                description: `Name must be filled`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }
        if(!username.current.value){
            return toast({
                title: 'Login Error',
                description: `Username must be filled`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }
        if(!email.current.value){
            return toast({
                title: 'Login Error',
                description: `Email must be filled`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }
        if(!password.current.value){
            return toast({
                title: 'Login Error',
                description: `Password must be filled`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }
        if(password.current.value.length<4){
            return toast({
                title: 'Login Error',
                description: `Password must be 4 characters or more`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }

        const data = {
            name : name.current.value,
            username : username.current.value,
            email : email.current.value,
            password : password.current.value
        }
        Axios.post("http://localhost:5000/api/admin/add",data)
        .then((respond)=>{
            toast({
                title: 'Add Admin Success',
                description: ``,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            navigate('/admin')
        })
        .catch((error)=>{
            toast({
                title: 'Login Error',
                description: `${error.response.data}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        })
    }

    return (
        <div className="main">
            <div className="sub-main">
                <div>
                    <div className="imgs">
                        <div className="container-image">
                            <img src={profile} alt="profile" className="profile" />
                        </div>
                    </div>
                    <div>
                        <h1>Add New Admin</h1>
                    </div>
                    <div className="formInput">
                        <input type="text" className="name nameLowPadding" placeholder="Name" ref={name}/>
                    </div>
                    <div className="formInput">
                        <input type="text" className="name nameLowPadding" placeholder="Username" ref={username}/>
                    </div>
                    <div className="formInput">
                        <input type="text" className="name nameLowPadding" placeholder="Email" ref={email}/>
                    </div>
                    <div className="formInput">
                        <input type="password" className="name nameLowPadding" placeholder="Password (Min. 4 Characters)" ref={password}/>
                    </div>
                    <div className="formInput">
                        <button className="submitButton" onClick={registerAdmin}>
                            Add Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminRegister;