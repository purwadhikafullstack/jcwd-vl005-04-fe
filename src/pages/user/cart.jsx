import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { Box, Flex, Text, useToast } from "@chakra-ui/react"

import CartItem from "./components/cartItem"
import Header from "./components/header"

import io from "socket.io-client";
import formatThousands from "format-thousands"
import { Button } from "react-bootstrap"
import { getUserInfo } from "../../utils"

const socket = io('http://localhost:5001');
let notificationSent = false;

function Cart() {
    const API_URL = process.env.REACT_APP_API_URL
    const toast = useToast()
    const user_id = getUserInfo().id
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([])
    
    const totalShop = useRef(0)

    useEffect(() => {
        axios.get(`${API_URL}/cart/${user_id}`)
        .then((response) => {
            setCartItems(response.data)
        })
        .catch((error) => {
            console.log(error)
            showToast('error', 'Gagal mendapatkan barang dalam keranjang')
        })
    }, [])

    const onDeleteClick = (product_id) => {
        axios.delete(`${API_URL}/cart/delete/${user_id}/${product_id}`)
            .then((response) => {
                showToast('success', 'Berhasil menghapus barang dari keranjang')
            })
            .catch((error) => {
                showToast('error', 'Gagal menghapus barang dari keranjang')
                console.log(error)
            })

        axios.get(`${API_URL}/cart/${user_id}`)
            .then((response) => {
                setCartItems(response.data)
            })
            .catch((error) => {
                console.log(error)  
                showToast('error', 'Gagal mendapatkan barang dalam keranjang')
            })
    }

    const showCartItems = () => {
        totalShop.current = 0
        return cartItems.map((item, index) => {
            totalShop.current += item.price * item.volume
            return (
                <CartItem 
                    key={index}
                    product_id={item.product_id}
                    volume={item.volume}
                    price={item.price}
                    created_at={item.created_at}
                    name={item.name}
                    abbreviation={item.abbreviation}
                    onDeleteClick={() => onDeleteClick(item.product_id)}
                    updateTotal={updateTotalShop}
                />
            )
        })
    }

    const showToast = (type = 'success', description = 'Operation Success') => {
        return toast({
            title: type,
            description: description,
            status: type,
            duration: 3000,
            isClosable: true,
        })
    }

    const updateTotalShop = () => {
        axios.get(`${API_URL}/cart/${user_id}`)
            .then((response) => {
                setCartItems(response.data)
            })
            .catch((error) => {
                console.log(error)  
                showToast('error', 'Gagal memperbaharui total belanja')
            })
    }

    const buyTest = () => {
        socket.emit('finishTransaction', '')
    }

    socket.on('confirmasiCheckOutBerhasil', (arg) => {
        if (user.role == "admin" && !notificationSent) {
            notificationSent = true;
            toast({
                title: "Transaction Success",
                description: arg,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            navigate('/')
        }
    })

    const onCheckout = () => {
        if (cartItems.length === 0) {
            showToast('error', 'Belum ada produk')
            return
        }
        navigate("/checkout")
    }

    return (
        <>
            <Header />

            <Flex gap={4} justifyContent='center' p={4} alignItems='start'>
                <Flex direction='column' gap={3} w='50%'>
                    { showCartItems() }
                </Flex>
                <Box shadow='md' borderRadius={10} w='25%' p={4}>
                    <Text fontWeight='bold' borderBottomWidth={2} borderBottomColor='blue.500' pb={2} mb={5}>Ringkasan Pembelian</Text>
                    <Flex justifyContent='space-between' mb={4}>
                        <Text fontWeight='bold'>Total Belanja: Rp</Text>
                        <Text>{ new Intl.NumberFormat('id-ID').format(totalShop.current) }</Text>
                    </Flex>
                    <Button size='sm' w='100%' colorScheme='blue' onClick={onCheckout}>Checkout</Button>
                </Box>
            </Flex>
        </>
    )
}

export default Cart