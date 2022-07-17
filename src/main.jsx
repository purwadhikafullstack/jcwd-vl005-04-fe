import React, { useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

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
import PrivateRoute from './pages/route/PrivateRoute'
import AuthRoute from './pages/route/AuthRoute'
import AuthRouteAdmin from './pages/route/AuthRouteAdmin'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import Register from './pages/auth/Register'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyAccount from './pages/auth/VerifyAccount'
import NotFound from './pages/NotFound'

import Home from './pages/user/home'
import Cart from './pages/user/cart'

import io from "socket.io-client";
import { useToast } from '@chakra-ui/react'
import PrivateRouteAdmin from './pages/route/PrivateRouteAdmin'
import Checkout from './pages/user/Checkout'
import PendingPayment from './pages/user/PendingPayment'
import UploadPayment from './pages/user/UploadPayment'
import Invoice from './pages/user/invoice'

const socket = io('http://localhost:5001');

const API_URL = process.env.REACT_APP_API_URL
function App() {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state)

  useEffect(() => {
    const admintoken = localStorage.getItem('admintoken')
    console.log(admintoken)
    if (admintoken) {
      Axios.get(API_URL + `/admin/${admintoken}`)
        .then((respond) => {
          if(respond.data=="")localStorage.removeItem('admintoken')
          dispatch({ type: 'ADMIN_LOGIN', payload: respond.data })
        })
        .catch((error) => {
          console.log(error.response.data)
          Navigate('/admin')
        })
    }
  }, [])

  socket.on('confirmasiCheckOutBerhasil', (arg) => {
    console.log('test')
        toast({
            title: "Transaction Success",
            description: arg,
            status: "success",
            duration: 3000,
            isClosable: true,
        })
  })

  return (
    <div>
      {/* <AdminNavigation/> */}
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/invoice/:no' element={<Invoice/>} />

        {/* admin */}
        <Route exact path="/admin" element={<PrivateRouteAdmin />}>
          <Route path='/admin/home' element={<Landing />} />
          <Route path='/admin/register' element={<AdminRegister />} />
          <Route path='/admin/transaction' element={<AdminTransaction />} />
          <Route path='/admin/user-transactions/:id' element={<AdminUserTransactions />} />
          <Route path='/admin/view-user' element={<AdminViewUser />} />
          <Route path='/admin/forget-password' element={<AdminForgetPassword/>} />
          <Route path='/admin/reset-password/:id' element={<AdminResetPassword />} />
          <Route path='/admin/products' element={<ProductHome />} />
          <Route path='/admin/products/category-list' element={<ProductHome />} />
          <Route path="/admin/report" element={<AdminReport />} />
        </Route>

        <Route exact path="/admin" element={<AuthRouteAdmin />}>
          <Route path='/admin' element={<AdminLogin />} />
        </Route>
        {/* admin */}

        
        {/* user */}
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/pending-payment' element={<PendingPayment />} />
          <Route path='/upload-payment' element={<UploadPayment />} />
        </Route>

        <Route exact path="/" element={<AuthRoute />}>
          <Route element={<Login />} path="/login" exact />
          <Route element={<Register />} path="/register" exact />
          <Route element={<ForgotPassword />} path="/forgot-password" exact/>
          <Route element={<ResetPassword />} path="/reset-password" exact />
          <Route element={<VerifyAccount />} path="/verify-email" exact />
        </Route>
        {/* user */}

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;