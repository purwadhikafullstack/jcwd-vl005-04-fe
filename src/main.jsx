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
import AdminTransaction from './pages/admin/adminTransactions'
import AdminViewUser from './pages/admin/adminViewUser'

// Product pages
import ProductHome from './pages/product/productHome'

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state)

  useEffect(()=>{
    const admintoken = localStorage.getItem('admintoken')
    if(admintoken){
      console.log("admintoken : ", admintoken)
      Axios.get(`http://localhost:5000/api/admin/${admintoken}`)
      .then((respond)=>{
        dispatch({type : 'ADMIN_LOGIN', payload : respond.data})
      })
      .catch((error)=>{
        console.log(error.response.data)
      })
    }
  },[])

  useEffect(()=>{
    let data = {
      transactions : [],
      users_data : []
    }
    Axios.get("http://localhost:5000/api/transaction")
    .then((respond1)=>{
        data.transactions = respond1.data
    })
    .catch((error)=>{
        console.log(error.response.data)
    })

    Axios.get("http://localhost:5000/api/users")
    .then((respond2)=>{
      
        data.users_data = respond2.data
        console.log("respond : ",respond2.data)
    })
    .catch((error)=>{
        console.log(error.response.data)
    })
    console.log(data)
    dispatch({type : 'ADMIN_GET_DATA', payload : data})
  },[])

  return (
    <div>
      <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/register' element={<AdminRegister/>}/>
        <Route path='/admin/transaction' element={<AdminTransaction/>}/>
        <Route path='/admin/view-user' element={<AdminViewUser/>}/>
        <Route path='/admin/forget-password' element={<AdminForgetPassword/>}/>
        <Route path='/admin/reset-password/:id' element={<AdminResetPassword/>}/>
        <Route path='/admin/products' element={<ProductHome />} />
        <Route path='/admin/products/create' element={<ProductHome />} />
      </Routes>
    </div>
  )
}

export default App;