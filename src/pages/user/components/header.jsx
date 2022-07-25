import React from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { Box, Button, Flex, Link, Image } from "@chakra-ui/react";
import { BiShoppingBag } from 'react-icons/bi'

import logoHeader from "../../../images/logo_header.png"

function Header({ isAuth }) {
    const user = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const isLogin = localStorage.getItem("access_token") !== null
    
    const onLogout = () => {
        localStorage.removeItem("access_token");
        navigate('/login');
    }

    return (
        <Box p={4} className='bg-primary' fontWeight='bold' textColor='white'>
            {
                user.role === 'admin' ?
                    <Flex justifyContent='space-between' alignItems='center'>
                        Pharmacy Admin
                    </Flex>
                    :
                    <Flex justifyContent='space-between' alignItems='center'>
                        <Link href='/' fontSize='3xl'>
                            <Flex alignItems='center' gap={4}>
                                <Image src={logoHeader} height={70}/>
                                Home
                            </Flex>
                        </Link>
                        <Flex gap={3} justifyContent='center' alignItems='center'>
                            { isLogin ? 
                                <Link href='/pending-payment' fontSize='3xl'>Payment Status</Link>
                                :
                                null
                            }
                            <Link href={isLogin ? '/cart' : '/login'} fontSize='3xl'><BiShoppingBag /></Link>
                            { isLogin ?
                                <Button variant='link' onClick={onLogout}><div style={{color:"white", fontSize:"30px"}}>Logout</div></Button>
                                :
                                <Link href='/login' fontSize='3xl'>Login</Link>
                            }
                        </Flex>
                    </Flex>
            }
        </Box>
    )
}

export default Header