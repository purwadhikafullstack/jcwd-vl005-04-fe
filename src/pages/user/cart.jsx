import React, { useEffect, useState } from "react"
import axios from "axios"
import { useToast } from "@chakra-ui/react"

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import CartItem from "./components/cartItem"
import Header from "./components/header"

import io from "socket.io-client";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const socket = io('http://localhost:5001');
let notificationSent = false;
function Cart () {
    const API_URL = process.env.REACT_APP_API_URL
    const toast = useToast()
    const user_id = localStorage.getItem('user_id')
    const user = useSelector((state)=>state.user)
    const navigate = useNavigate();

    const [ cartItems, setCartItems ] = useState([])
    
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
        return cartItems.map((item, index) => {
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
    const buyTest = () =>{
        socket.emit('finishTransaction','')
    }
    socket.on('confirmasiCheckOutBerhasil',(arg)=>{
        if(user.role=="admin"&&!notificationSent){
            notificationSent=true;
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
    return (
        <>
            <Header />
            <div className="p-4">                
                <div className="w-50 mx-auto">
                    { showCartItems() }
                </div>
            </div>
        </>
    )
}

export default Cart