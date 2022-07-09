import React, { useEffect } from 'react'

import { Routes, Route} from 'react-router-dom'

import Axios from "axios"
import Landing from './pages/landing'
import { useDispatch, useSelector } from 'react-redux'

// Admin pages
import AdminLogin from './pages/admin/adminLogin'
import AdminForgetPassword from './pages/admin/adminForgetPassword'
import AdminResetPassword from './pages/admin/adminResetPassword'
import AdminRegister from './pages/admin/adminRegister'

import AdminTransaction from './pages/admin/adminTransactions';
import AdminViewUser from './pages/admin/adminViewUser';
import AdminNavigation from './pages/admin/adminnavigation';
import AdminUserTransactions from './pages/admin/adminUserTransactions';
import AdminReport from "./pages/admin/adminReport";
import ProductHome from './pages/product/productHome'
import Home from './pages/user/home'
import Cart from './pages/user/cart'

import io from "socket.io-client";
import { useToast } from '@chakra-ui/react'

const socket = io('http://localhost:5001');

const API_URL = process.env.REACT_APP_API_URL
function App() {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state)

  useEffect(()=>{
    socket.on("hello", (arg)=>{
      console.log(arg);
    })
  },[])

  useEffect(()=>{
    const admintoken = localStorage.getItem('admintoken')
    if(admintoken){
      console.log("admintoken : ", admintoken)
      Axios.get(API_URL + `/admin/${admintoken}`)
      .then((respond)=>{
        dispatch({type : 'ADMIN_LOGIN', payload : respond.data})
      })
      .catch((error)=>{
        console.log(error.response.data)
      })
    }
  },[])

  return (
    <div>
      {/* <AdminNavigation/> */}
      <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/register' element={<AdminRegister/>}/>
        <Route path='/admin/transaction' element={<AdminTransaction/>}/>
        <Route path='/admin/user-transactions/:id' element={<AdminUserTransactions/>}/>
        <Route path='/admin/view-user' element={<AdminViewUser/>}/>
        <Route path='/admin/forget-password' element={<AdminForgetPassword/>}/>
        <Route path='/admin/reset-password/:id' element={<AdminResetPassword/>}/>
        <Route path='/admin/products' element={<ProductHome />} />
        <Route path='/admin/products/category-list' element={<ProductHome />} />
        <Route path="/admin/report" element={<AdminReport />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App;