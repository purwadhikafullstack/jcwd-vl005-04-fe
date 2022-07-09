import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../../css/admin/adminNavbar.css"
import SidebarItem from "./sidebarItem"

function SidebarMain () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () =>{
        dispatch({type:"ADMIN_LOGOUT"})
        navigate('/admin')
    }
    return (
        <div 
            className="d-flex flex-column border-end border-primary fw-bold position-fixed bg-dark text-white" 
            style={{ height: "100%", width: "15%" }}
        >
            <div 
                name="sidebar_heading" 
                className="text-center py-4 mb-3 border-bottom border-white"
            >
                <h1>Admin</h1>
            </div>
            <div name="sidebar_content">
                <SidebarItem text="Add Products" url="/admin/products"/>
                <SidebarItem text="Transaction" url="/admin/transaction"/>
                <SidebarItem text="Category List" url="/admin/products/category-list"/>
                <SidebarItem text="User List" url="/admin/view-user"/>
                <SidebarItem text="Add Admin" url="/admin/register"/>
                <SidebarItem text="Report" url="/admin/report"/>
                
            </div>
            <button className="logoutBtn" onClick={logout}>Log out</button>
        </div>
    )
}

export default SidebarMain