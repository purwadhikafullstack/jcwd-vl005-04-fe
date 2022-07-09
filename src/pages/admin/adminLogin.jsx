import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import '../../css/admin/loginregister.css'
import { useNavigate } from 'react-router-dom'
import { Spinner, useToast } from '@chakra-ui/react'

import profile from "../../images/a.png";
import email from "../../images/email.jpeg";
import pass from "../../images/pass.png";
import { useEffect } from 'react'
import Header from '../user/components/header'

const API_URL = process.env.REACT_APP_API_URL
function AdminLogin () {
    const toast = useToast();
    const user = useSelector((state) => state)
    const navigate = useNavigate();

    useEffect(()=>{
      const token = localStorage.getItem('admintoken')
      if(token) navigate('/admin/home');
    },[])
    

    if(user.email){
        navigate('/')
    }
    const emailInput = useRef("");
    const password = useRef("");

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState();
    const [showPassword, setShowPassword] = useState(false)
    const [keepLogged, setKeepLogged] = useState(false)

    const dispatch = useDispatch()

    const onSubmitButton = () =>{
        setLoading(true);

        if(!emailInput.current.value){
            setLoading(false);
            toast({
                title: 'email cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            return setErrorMessage("email cannot be empty")
        }
        if(!password.current.value){
            setLoading(false);
            toast({
                title: 'Password cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            return setErrorMessage("Password cannot be empty")
        }

        const data = {
            email : emailInput.current.value,
            password : password.current.value
        }
        console.log(data)
        Axios.post(API_URL + "/admin/login", data)
        .then((respond)=>{
            console.log(respond.data)
            setErrorMessage("Login Success")
            if(keepLogged){
                localStorage.setItem("admintoken",respond.data.id)
            }
            dispatch({ type : 'ADMIN_LOGIN', payload : respond.data})
            setLoading(false);
            toast({
                title: 'Login Success!',
                description: "",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            navigate('/admin/home')
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
    const changeShowState = () =>{
        if(showPassword)return setShowPassword(false)
        return setShowPassword(true)
    }
    const changeKeepLogged = () =>{
        if(showPassword)return setKeepLogged(false)
        return setKeepLogged(true)
    }
    return (
    <div>
      <div className="main">
        <div className="sub-main">
          <div>
            <div className="imgs">
              <div className="container-image">
                <img src={profile} alt="profile" className="profile" />
              </div>
            </div>
            <div>
              <h1>Admin Login Page</h1>
              <div className='inputForm'>
                <img src={email} alt="email" className="email" />
                <input type="text" placeholder="email" className="name" ref={emailInput}/>
              </div>
              <div className="inputForm">
                <img src={pass} alt="pass" className="email" />
                <input type="password" placeholder="password" className="name" ref={password}/>
              </div>

              <div className='inputForm'>
                  <input type="checkbox" className = "checkbox" onClick={changeKeepLogged}></input> Keep Login
                </div>

              <div className="login-button">
                <button className="submitButton" onClick={onSubmitButton}>Login</button>
              </div>

              <div className="link">
                  <button className='linkButton' onClick={() => navigate('/admin/forget-password')}>
                      Forget Password
                  </button> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    )
}
export default AdminLogin;