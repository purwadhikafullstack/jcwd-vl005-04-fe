import React, { useState, useEffect, useRef }  from "react"
import axios from "axios"

import { Box, Button, Select, Table, TableContainer, Tbody, Th, Thead, Tr, useToast } from "@chakra-ui/react"
import ProductItems from "./components/sub-view/productItems"
import ProductCreate from "./productCreate"

function MainContent () {
    const API_URL = process.env.REACT_APP_API_URL
    const toast = useToast()

    const [ products, setProducts ] = useState([])
    const [ productUnits, setProductUnits ] = useState([])
    const [ productTypes, setProductTypes ] = useState([])
    const [ productCategories, setProductCategories ] = useState([])

    const [ newProductOpen, setNewProductOpen ] = useState('none')

    // New Product
    const newName = useRef('')
    const newType = useRef('')
    const newUnit = useRef('')
    const newCategory = useRef('')
    const [ btnDisabled, setBtnDisabled ] = useState(true)
    const [ editId, setEditId ] = useState(0)
    const [ newBottleStock, setNewBottleStock ] = useState(0)
    const [ newBottleCapacity, setNewBottleCapacity ] = useState(0)
    const [ newTotalQty, setNewTotalQty ] = useState(0)
    const [ newPrice, setNewPrice ] = useState(0)
    const [ type, setType ] = useState('new')

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
                    id={product.id}
                    index={index+1}
                    name={product.name}
                    bottle_stock={product.bottle_stock}
                    total_stock={product.total_quantity}
                    price={product.price_per_unit}
                    unit={product.unit}
                    onDeleteBtnClick={() => onButtonProductDelete(product.id)}
                    onEditBtnClick={() => onEditClick(
                            product.id,
                            product.name,
                            product.bottle_stock,
                            product.total_quantity,
                            product.bottle_volume,
                            product.price_per_unit,
                            product.product_unit_id,
                            product.product_category_id,
                            product.product_type_id
                        )}
                    type={type}
                />
            )
        })
    }

    const onEditClick = (id, name, bottle_stock, total, volume, price, unit, category, type) => {
        setEditId(id)

        newName.current.value = name
        newType.current.value = type
        newUnit.current.value = unit
        newCategory.current.value = category

        document.getElementById('bottle_stock').value = bottle_stock
        document.getElementById('bottle_capacity').value = volume
        document.getElementById('total_stock').value = total
        document.getElementById('price').value = price

        setNewBottleStock(bottle_stock)
        setNewBottleCapacity(volume)
        setNewTotalQty(total)
        setNewPrice(price)

        getProductAttributes()

        setType('update')
        setNewProductOpen('block')
    }

    const onButtonProductDelete = (id) => {
        axios.delete(`${API_URL}/products/delete/${id}`)
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
        setNewProductOpen('block')
        setType('new')

        getProductAttributes()
    }

    const getProductAttributes = () => {
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

        axios.get(`${API_URL}/categories?_active=1`)
            .then((response) => {
                setProductCategories(response.data)
            })
            .catch((error) => {
                showToast('error', 'Failed to fetch product category data')
                console.log(error)
            })
    }

    const onAddProductCancelClick = () => {
        setNewProductOpen('none')
        setType('new')

        resetNewProductField()
        checkRequiredFields()
    }

    const onNameChange = () => {
        setBtnDisabled(newName.current.value === '' || newType.current.value === '' || newUnit.current.value === '' || newPrice === '' || newPrice === '0')
    }

    const onTypeChange = () => {
        setBtnDisabled(newType.current.value === '' || newName.current.value === '' || newUnit.current.value === '' || newPrice === '' || newPrice === '0')
    }

    const onUnitChange = () => {
        setBtnDisabled(newUnit.current.value === '' || newType.current.value === '' || newName.current.value === '' || newPrice === '' || newPrice === '0')
    }

    const onBottleStockChange = (event) => {
        setNewBottleStock(event.target.value)
    }

    const onCapacityChange = (event) => {
        setNewBottleCapacity(event.target.value)
    }

    const onTotalQtyChange = (event) => {
        setNewTotalQty(event.target.value)
    }

    const onPriceChange = (event) => {
        setNewPrice(event.target.value)
        setBtnDisabled(event.target.value === '' || event.target.value === '0' || newType.current.value === '' || newUnit.current.value === '' || newName.current.value === '')
    }

    const onSubmitProductClick = () => {
        const data = {
            id: editId,
            name: newName.current.value,
            product_type_id: newType.current.value,
            bottle_stock: newBottleStock,
            bottle_volume: newBottleCapacity,
            total_quantity: newTotalQty,
            price_per_unit: newPrice,
            product_unit_id: newUnit.current.value,
            product_category_id: newCategory.current.value,
        }

        console.log(data)

        let path, success_message, error_message = ''

        if (type === 'new') {
            path = 'create'
            success_message = 'Successfully insert new product'
            error_message = 'Failed creating new product'
        }
        else if (type === 'update') {
            path = 'update/' + editId
            success_message = 'Successfully update product data'
            error_message = 'Failed updating product data'
        }

        axios.post(`${API_URL}/products/${path}`, data)
            .then((response) => {
                axios.get(API_URL + '/products')
                .then((get_response) => {
                    showToast('success', success_message)
                    console.log(get_response)
                    setProducts(get_response.data)
                    resetNewProductField()
                    checkRequiredFields()
                    
                    if (type === 'update') {
                        setType('new')
                        setNewProductOpen('none')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            })
            .catch((error) => {
                showToast('error', error_message)
                console.log(error)
            })
    }

    const resetNewProductField = () => {
        newName.current.value = ''
        newType.current.value = ''
        newUnit.current.value = ''
        newCategory.current.value = ''

        document.getElementById('bottle_stock').value = 0
        document.getElementById('bottle_capacity').value = 0
        document.getElementById('total_stock').value = 0
        document.getElementById('price').value = 0

        setNewBottleStock(0)
        setNewBottleCapacity(0)
        setNewTotalQty(0)
        setNewPrice(0)
    }

    const checkRequiredFields = () => {
        setBtnDisabled(
            newName.current.value === '' ||
            newType.current.value === '' ||
            newUnit.current.value === ''
        )
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
        <>
            <Select mb={4} w='25%' boxShadow='md' onChange={ applyFilter }>
                <option value="?_sort=id&_order=ASC">LATEST</option>
                <option value="?_sort=price_per_unit&_order=ASC">LOWEST TO HIGHEST PRICE</option>
                <option value="?_sort=price_per_unit&_order=DESC">HIGHEST TO LOWEST PRICE</option>
            </Select>
            <TableContainer backgroundColor='gray.50' borderRadius='10' boxShadow='md'>
                <Table variant='simple'>
                    <Thead backgroundColor='blue.100'>
                        <Tr>
                            <Th>#</Th>
                            <Th>Nama Produk</Th>
                            <Th>Stok Botol</Th>
                            <Th>Total Stok</Th>
                            <Th>Harga Eceran</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody backgroundColor='white'>
                        { generateProductRows() }
                    </Tbody>
                </Table>
            </TableContainer>
            
            <Button colorScheme='blue' mt={4} size='sm' onClick={ onAddProductClick } disabled={ type === 'update' ? true : false}>
                Tambah Produk
            </Button>

            <Box w='50%' mt={4} mx='auto' p={4} boxShadow='md' display={newProductOpen}>
                <ProductCreate 
                    key={'product_create'} 
                    types={productTypes}
                    units={productUnits}
                    categories={productCategories}
                    refName={newName}
                    refType={newType}
                    refUnit={newUnit}
                    refCategory={newCategory}
                    nameChange={onNameChange}
                    typeChange={onTypeChange}
                    unitChange={onUnitChange}
                    priceChange={onPriceChange}
                    bottleStockChange={onBottleStockChange}
                    capacityChange={onCapacityChange}
                    totalQtyChange={onTotalQtyChange}
                    btnDisabled={btnDisabled}
                    submit={onSubmitProductClick}
                    cancel={onAddProductCancelClick}
                />
            </Box>
        </>
    )
}

export default MainContent