import React, { useEffect } from 'react'

import { Routes, Route} from 'react-router-dom'

import Landing from './pages/landing'
import AdminLogin from './pages/admin/adminLogin'
import AdminForgetPassword from './pages/admin/adminForgetPassword'
import AdminResetPassword from './pages/admin/adminResetPassword'
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state)

  return (
    <div>
      <Routes>
      <Route path='/' element={<Landing/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/forget-password' element={<AdminForgetPassword/>}/>
        <Route path='/admin/reset-password/:id' element={<AdminResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App;