import React from "react";
import '../../css/admin/adminNavbar.css'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
function AdminNavigation(){
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = user.username;

    const logout = () =>{
        dispatch({type:"ADMIN_LOGOUT"})
        navigate('/admin')
    }

    return(
        <div className="navigationBar">
            <div className="navigationBarLeft">
                <button className="navbarLabel" onClick={()=>navigate('/')}>
                    Pharmacy
                </button>
            </div>
            <div className="navigationBarRight">
                {user.username?
                    <div className="navigationBarRight">
                        <div className="navbarLabel">
                            {username}
                        </div>
                        <div className="navbarDropdown">
                            Menu
                            <div className="navbarDropdownContainer">
                                <div className="navbarDropdownContent">
                                    <button className="navbarButtonDropdown" onClick={()=>navigate('/admin/transaction')}>
                                        Transactions
                                    </button>
                                    <button className="navbarButtonDropdown" onClick={()=>navigate('/admin/view-user')}>
                                        Users
                                    </button>
                                    <button className="navbarButtonDropdown" onClick={()=>navigate('/admin/register')}>
                                        Add Admin
                                    </button>
                                    <button className="navbarButtonDropdown" onClick={logout}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <button className="navbarButton" onClick={()=>navigate('/admin')}>
                        Login
                    </button>
                }
                
            </div>
        </div>
    )
}
export default AdminNavigation;