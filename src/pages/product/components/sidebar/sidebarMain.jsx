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
                <SidebarItem text="Home" url="/admin/home" location={location}/>
                <SidebarItem text="Add Products" url="/admin/products" location={location}/>
                <SidebarItem text="Transaction" url="/admin/transaction" location={location}/>
                <SidebarItem text="Category List" url="/admin/products/category-list" location={location}/>
                <SidebarItem text="User List" url="/admin/view-user" location={location}/>
                <SidebarItem text="Add Admin" url="/admin/register" location={location}/>
                <SidebarItem text="Report" url="/admin/report" location={location}/>
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