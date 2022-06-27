import React, { useState, useEffect }  from "react"
import axios from "axios"

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import ProductItems from "./components/sub-view/productItems"
import { useToast } from "@chakra-ui/react"
import ProductCreate from "./productCreate"

function MainContent () {
    const API_URL = process.env.REACT_APP_API_URL
    const toast = useToast()

    const [ products, setProducts ] = useState([])
    const [ productUnits, setProductUnits ] = useState([])
    const [ productTypes, setProductTypes ] = useState([])

    // New Product
    const [ newName, setNewName ] = useState('')
    const [ newType, setNewType ] = useState('')
    const [ newUnit, setNewUnit ] = useState('')
    const [ newBottleStock, setNewBottleStock ] = useState(0)
    const [ newBottleCapacity, setNewBottleCapacity ] = useState(0)
    const [ newTotalQty, setNewTotalQty ] = useState(0)
    const [ newPrice, setNewPrice ] = useState('')
    const [ btnDisabled, setBtnDisabled ] = useState(true)

    useEffect(() => {
        axios.get(API_URL + '/products')
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => {
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
        axios.delete(`${API_URL}/productss/delete/${id}`)
            .then((respond) => {
                showToast('success', 'Data berhasil dihapus')

                axios.get(`${API_URL}/products`)
                    .then((new_respond) => {
                        setProducts(new_respond.data)
                    })
            })
            .catch((error) => {
                showToast('error', 'Internal Service Error')
                console.log(error)
            })
    }

    const onAddProductClick = () => {
        axios.get(`${API_URL}/products/types`)
            .then((response) => {
                setProductTypes(response.data)
            })
            .catch((error) => {
                showToast('error', 'Failed to fetch product type data')
                console.log(error)
            })
        
        axios.get(`${API_URL}/products/units`)
            .then((response) => {
                setProductUnits(response.data)
            })
            .catch((error) => {
                showToast('error', 'Failed to fetch product unit data')
                console.log(error)
            })
    }

    const onNameChange = (event) => {
        setNewName(event.target.value)
        setBtnDisabled(event.target.value === '' || newType === '' || newUnit === '' || newPrice === '')
    }

    const onTypeChange = (event) => {
        setNewType(event.target.value)
        setBtnDisabled(event.target.value === '' || newName === '' || newUnit === '' || newPrice === '')
    }

    const onUnitChange = (event) => {
        setNewUnit(event.target.value)
        setBtnDisabled(event.target.value === '' || newType === '' || newName === '' || newPrice === '')
    }

    const onBottleStockChange = (event) => {
        setNewBottleStock(event)
        setBtnDisabled(newType === '' || newUnit === '' || newName === '' || newPrice === '')
    }

    const onCapacityChange = (event) => {
        setNewBottleCapacity(event)
        setBtnDisabled(newType === '' || newUnit === '' || newName === '' || newPrice === '')
    }

    const onTotalQtyChange = (event) => {
        setNewTotalQty(event)
        setBtnDisabled(newType === '' || newUnit === '' || newName === '' || newPrice === '')
    }

    const onPriceChange = (event) => {
        setNewPrice(event)
        setBtnDisabled(event === '0' || newType === '' || newUnit === '' || newName === '')
    }

    const onSubmitProductClick = () => {
        const data = {
            name: newName,
            product_type_id: newType,
            bottle_stock: newBottleStock,
            bottle_volume: newBottleCapacity,
            total_quantity: newTotalQty,
            price_per_unit: newPrice,
            product_unit_id: newUnit
        }

        axios.post(`${API_URL}/products/create`, data)
            .then((response) => {
                showToast('success', 'Successfully inserting product')
                console.log(response)

                axios.get(API_URL + '/products')
                .then((response) => {
                    setProducts(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                showToast('error', 'Failed inserting product')
                console.log(error)
            })
    }

    const applyFilter = (event) => {
        const query = event.target.value

        axios.get(`${API_URL}/products${query}`)
            .then((response) => {
                console.log(response)
                setProducts(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div name="product-pages">
            <div name="filter" className="mb-4 w-25 shadow">
                <select class="form-select" onChange={applyFilter}>
                    <option value="?_sort=id&_order=ASC">LATEST</option>
                    <option value="?_sort=price_per_unit&_order=ASC">LOWEST TO HIGHEST PRICE</option>
                    <option value="?_sort=price_per_unit&_order=DESC">HIGHEST TO LOWEST PRICE</option>
                </select>
            </div>
            <div className="table-responsive rounded shadow mb-4">
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
            <button className="btn btn-sm btn-primary mb-4 fw-bold w-auto" onClick={onAddProductClick}>
                Tambah Produk
            </button>
            <div className="d-flex justify-content-center w-100">
                <div className="w-50 rounded shadow p-4">
                    <ProductCreate 
                        key={'product_create'} 
                        types={productTypes}
                        units={productUnits}
                        totalQty={newTotalQty}
                        nameChange={onNameChange}
                        typeChange={onTypeChange}
                        unitChange={onUnitChange}
                        bottleChange={onBottleStockChange}
                        capacityChange={onCapacityChange}
                        totalChange={onTotalQtyChange}
                        priceChange={onPriceChange}
                        btnDisabled={btnDisabled}
                        submit={onSubmitProductClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default MainContent