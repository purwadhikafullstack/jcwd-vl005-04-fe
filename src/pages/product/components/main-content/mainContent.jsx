import React, { useState, useEffect }  from "react"
import axios from "axios"

import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import Header from "../header/header"
import ProductItems from "./sub-view/productItems"
import { useToast } from "@chakra-ui/react"

function MainContent () {
    const API_URL = process.env.REACT_APP_API_URL
    const toast = useToast()

    const [ products, setProducts ] = useState([])

    useEffect(() => {
        axios.get(API_URL + '/products')
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const showToast = (type = 'success') => {
        return toast({
            title: type === 'success' ? 'Operation Success' : 'Operation Failed',
            status: type,
            duration: 3000,
            isClosable: true,
        })
    }

    const generateProductRows = () => {
        return products.map((product, index) => {
            return (
                <ProductItems 
                    key={product.id}
                    index={index+1}
                    name={product.name}
                    bottle_stock={product.bottle_stock}
                    total_stock={product.total_quantity}
                    price={product.price_per_unit}
                    unit={product.unit}
                    onDeleteBtnClick={() => onButtonProductDelete(product.id)}
                />
            )
        })
    }

    const onButtonProductDelete = (id) => {
        axios.delete(`${API_URL}/products/delete/${id}`)
            .then((respond) => {
                console.log(respond.data)

                showToast('success')

                axios.get(`${API_URL}/products`)
                    .then((new_respond) => {
                        setProducts(new_respond.data)
                    })
            })
            .catch((error) => {
                showToast('error')
                console.log(error)
            })
    }

    return (
        <div name="content" className="p-4">
            <div className="table-responsive rounded">
                <table className="table">
                    <thead>
                        <tr className="text-center table-dark">
                            <th>#</th>
                            <th>Nama Produk</th>
                            <th>Stok Botol</th>
                            <th>Total Stok</th>
                            <th>Harga Eceran</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { generateProductRows() }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MainContent