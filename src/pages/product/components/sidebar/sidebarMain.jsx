import React from "react"

import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import SidebarItem from "./sidebarItem"

function SidebarMain () {
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
                <SidebarItem text="Home" url="/admin/products"/>
                <SidebarItem text="Create Product"/>
                <SidebarItem text="Category List"/>
            </div>
        </div>
    )
}

export default SidebarMain