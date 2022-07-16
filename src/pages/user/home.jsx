import React, { useState, useEffect } from "react"
import axios from "axios"

import { useToast } from "@chakra-ui/react"

import Card from "./components/card"
import Header from "./components/header"
import { getUserInfo } from "../../utils"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()
    const isLogin = localStorage.getItem("access_token") !== null

    const API_URL = process.env.REACT_APP_API_URL
    const toast = useToast()

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/products`)
            .then((response) => {
                console.log(response.data)
                setProducts(response.data)
            })
            .catch((error) => {
                showToast('error', 'Gagal mendapatkan data produk')
                console.log(error)
            })
    }, [])

    const showToast = (type = 'success', description = 'Operation Success') => {
        return toast({
            title: type,
            description: description,
            status: type,
            duration: 3000,
            isClosable: true,
        })
    }

    const showProducts = () => {
        return products.map((product, index) => {
            return (
                <div className="col-3" key={index}>
                    <Card
                        id={product.id}
                        name={product.name}
                        qty={product.total_quantity}
                        unit={product.unit}
                        onCartClick={() => {
                            if (!isLogin) {
                                navigate("/login")
                                return
                            }
                            onCartButtonClick(product.id, product.price_per_unit)
                        }}
                    />
                </div>
            )
        })
    }

    const applyFilter = (event) => {
        const query = event.target.value

        axios.get(`${API_URL}/products${query}`)
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => {
                showToast('error', 'Gagal menerapkan filter')
                console.log(error)
            })
    }

    const onCartButtonClick = (id, price) => {
        const data = {
            product_id: id,
            price: price,
            user_id: getUserInfo().id,
            created_at: new Date().toISOString().slice(0, 10)
        }

        axios.post(`${API_URL}/cart/insert`, data)
            .then((response) => {
                showToast('success', 'Berhasil menambahkan barang ke keranjang')
            })
            .catch((error) => {
                showToast('error', 'Gagal menambahkan barang ke keranjang')
                console.log(error)
            })
    }

    return (
        <>
            <Header />
            <div className="p-4">
                <div name="filter" className="mb-4 w-25 shadow">
                    <select className="form-select" onChange={applyFilter}>
                        <option value="?_sort=id&_order=ASC">LATEST</option>
                        <option value="?_sort=price_per_unit&_order=ASC">LOWEST TO HIGHEST PRICE</option>
                        <option value="?_sort=price_per_unit&_order=DESC">HIGHEST TO LOWEST PRICE</option>
                    </select>
                </div>
                <div className="row">
                    {showProducts()}
                </div>
            </div>
        </>
    )
}

export default Home