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
    const [ newBottleStock, setNewBottleStock ] = useState('0')
    const [ newBottleCapacity, setNewBottleCapacity ] = useState('0')
    const [ newTotalQty, setNewTotalQty ] = useState('0')
    const [ newPrice, setNewPrice ] = useState('0')
    const [ btnDisabled, setBtnDisabled ] = useState(true)
    const [ newImg, setNewImg ] = useState(null)

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
        setNewBottleStock(event)
    }

    const onCapacityChange = (event) => {
        setNewBottleCapacity(event)
    }

    const onTotalQtyChange = (event) => {
        setNewTotalQty(event)
    }

    const onPriceChange = (event) => {
        setNewPrice(event)
        setBtnDisabled(event === '' || event === '0' || newType.current.value === '' || newUnit.current.value === '' || newName.current.value === '')
    }

    const onImgChange = (event) => {
        console.log(event.target.files[0])
        setNewImg(event.target.files[0])
    }

    const onSubmitProductClick = () => {
        const data = {
            name: newName.current.value,
            product_type_id: newType.current.value,
            bottle_stock: newBottleStock,
            bottle_volume: newBottleCapacity,
            total_quantity: newTotalQty,
            price_per_unit: newPrice,
            product_unit_id: newUnit.current.value,
            product_category_id: newCategory.current.value,
            img: newImg
        }

        const formData = new FormData();
        formData.append('file', newImg)
        // formData.append('data', data)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(`${API_URL}/products/create`, formData, config)
            .then((response) => {
                showToast('success', 'Berhasil upload')
            })
            .catch((error) => {
                showToast('error', 'Gagal upload')
                console.log(error)
            })
        // axios.post(`${API_URL}/products/create`, uploadData)
        //     .then((response) => {
        //         axios.get(API_URL + '/products')
        //         .then((get_response) => {
        //             showToast('success', 'Successfully inserting product')
        //             console.log(get_response)
        //             setProducts(get_response.data)
        //             resetNewProductField()
        //             checkRequiredFields()
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })
        //     })
        //     .catch((error) => {
        //         showToast('error', 'Failed inserting product')
        //         console.log(error)
        //     })
    }

    const resetNewProductField = () => {
        newName.current.value = ''
        newType.current.value = ''
        newUnit.current.value = ''
        newCategory.current.value = ''
        setNewBottleStock('')
        setNewBottleCapacity('')
        setNewTotalQty('')
        setNewPrice('')
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
        <div name="product-pages">
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
            
            <Button colorScheme='blue' mt={4} size='sm' onClick={ onAddProductClick }>
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
                    imgChange={onImgChange}
                />
            </Box>
        </div>
    )
}

export default MainContent