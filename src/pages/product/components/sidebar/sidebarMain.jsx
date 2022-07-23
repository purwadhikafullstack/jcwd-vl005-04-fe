import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Button, Flex, Link } from "@chakra-ui/react"
import SidebarItem from "./sidebarItem"

function SidebarMain () {
    const location = window.location.pathname

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const logout = () =>{
        dispatch({type:"ADMIN_LOGOUT"})
        navigate('/admin')
    }

    return (
        <Flex position='fixed' h='100%' w='15%' direction='column' backgroundColor='blue.700' justifyContent='space-between'>
            <Flex direction='column'>
                <div className="sidebarButton" onClick={()=>navigate('/admin/home')}>Home</div>
                <div className="sidebarButton" onClick={()=>navigate('/admin/products')}>Add Products</div>
                <div className="sidebarButton" onClick={()=>navigate('/admin/transaction')}>Transaction</div>
                <div className="sidebarButton" onClick={()=>navigate('/admin/products/category-list')}>Category List</div>
                <div className="sidebarButton" onClick={()=>navigate('/admin/view-user')}>User List</div>
                <div className="sidebarButton" onClick={()=>navigate('/admin/register')}>Add Admin</div>
                <div className="sidebarButton" onClick={()=>navigate('/admin/report')}>Report</div>
            </Flex>
            <Button
                p={2}
                color='white'
                variant='link'
                borderTopColor='white'
                borderTopWidth={4}
                borderRadius={0}
                onClick={logout}
            >
                Logout
            </Button>
        </Flex>
    )
}

export default SidebarMain