import React from "react"
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import logoHeader from "../../../images/logo_header.png"
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { BiShoppingBag } from 'react-icons/bi'

function Header({ isAuth }) {
    const navigate = useNavigate()
    const isLogin = localStorage.getItem("access_token") !== null

    const onLogout = () => {
        localStorage.removeItem("access_token");
        navigate('/login');
    }

    return (
        <Box p={4} backgroundColor='blue.500' fontWeight='bold' textColor='white'>
            <Flex justifyContent='space-between' alignItems='center'>
                <Link href='/home' fontSize='3xl'>Product Page</Link>
                <Flex gap={3} justifyContent='center' alignItems='center'>
                    { isLogin ? 
                        <Link href='/pending-payment' fontSize='3xl'>Payment Status</Link>
                        :
                        null
                    }
                    <Link href={isLogin ? '/cart' : '/login'} fontSize='3xl'><BiShoppingBag /></Link>
                    { isLogin ?
                        <Button variant='link' onClick={onLogout}>Logout</Button>
                        :
                        <Link href='/login' fontSize='3xl'>Login</Link>
                    }
                </Flex>
            </Flex>
        </Box>
    )
}

export default Header