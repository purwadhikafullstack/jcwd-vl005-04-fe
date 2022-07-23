import axios from "axios"
import React, { useEffect, useState, useRef } from "react"

import { Box, Button, Flex, Input, Table, TableContainer, Tbody, Th, Thead, Tr, useToast } from "@chakra-ui/react"

import CategoryItems from "./components/sub-view/categoryItems"
import CategoryItemEditable from "./categoryItemEditable"

function CategoryList () {
    const API_URL = process.env.REACT_APP_API_URL
    const toast = useToast()

    const [ categories, setCategories ] = useState([])
    const [ isDisabled, setIsDisabled ] = useState(true)
    const [ editId, setEditId ] = useState(0)
    const [ newName, setNewName ] = useState('')

    const newCategory = useRef('')

    useEffect(() => {
        axios.get(`${API_URL}/categories`)
            .then((response) => {
                setCategories(response.data)
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

    const showCategoryList = () => {
        return categories.map((category, index) => {
            if (category.id === editId) {                
                return (
                    <CategoryItemEditable
                        key={category.id}
                        index={index + 1}
                        name={category.name}
                        status={category.is_active}
                        cancelClick={onCancelClick}
                        saveClick={onSaveClick}
                        nameUpdate={onNameChange}
                    />
                )
            } else {
                return (
                    <CategoryItems
                        key={category.id}
                        index={index + 1}
                        name={category.name}
                        status={category.is_active}
                        deleteClick={() => onDeleteClick(category.id)}
                        restoreClick={() => onRestoreClick(category.id)}
                        editClick={() => onEditClick(category.id)}
                    />
                )
            }
        })
    }

    const onNameChange = (event) => {
        setNewName(event.target.value)
    }

    const onDeleteClick = (id) => {
        axios.delete(`${API_URL}/categories/delete/${id}`)
            .then((response) => {
                console.log(response)

                showToast('success', 'Berhasil menonaktifkan kategori')

                axios.get(`${API_URL}/categories`)
                    .then((get_response) => {
                        setCategories(get_response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                showToast('error', 'Gagal menonaktifkan kategori')
                console.log(error)
            })
    }

    const onRestoreClick = (id) => {
        axios.post(`${API_URL}/categories/restore`, {id: id})
            .then((response) => {
                console.log(response)

                showToast('success', 'Sukses mengembalikan kategori')

                axios.get(`${API_URL}/categories`)
                    .then((get_response) => {
                        setCategories(get_response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                showToast('error', 'Gagal mengembalikan kategori')
                console.log(error)
            })
    }

    const onEditClick = (id) => {
        setEditId(id)
    }

    const onAddClick = () => {
        axios.post(`${API_URL}/categories/create`, {name: newCategory.current.value})
            .then((response) => {
                showToast('success', 'Berhasil menambahkan kategori baru')

                axios.get(`${API_URL}/categories`)
                    .then((get_response) => {
                        newCategory.current.value = ''
                        setCategories(get_response.data)
                    })                    
            })
            .catch((error) => {
                showToast('error', 'Gagal menambahkan kategori baru')
                console.log(error)
            })
    }

    const onSaveClick = () => {
        const data = {
            id: editId,
            name: newName
        }
        axios.post(`${API_URL}/categories/update`, data)
            .then((response) => {
                showToast('success', 'Berhasil memperbaharui data')

                setEditId(0)

                axios.get(`${API_URL}/categories`)
                .then((get_response) => {
                    setCategories(get_response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            })
    }

    const onCancelClick = () => {
        setEditId(0)
    }

    const onNewCategoryChange = () => {
        setIsDisabled(newCategory.current.value === '')
    }

    return (
        <div name="category-list">
            <Box w='50%' mx='auto' mb={4} p={4} boxShadow='md'>
                <Flex gap='3'>
                    <Input w='75%' ref={newCategory} id='name' type='text' placeholder="Nama Kategori Baru" onChange={onNewCategoryChange}/>
                    <Button w='25%' colorScheme='blue' isDisabled={isDisabled} onClick={onAddClick}>Tambah</Button>
                </Flex>
            </Box>

            <TableContainer boxShadow='md' borderRadius='10'>
                <Table variant='simple'>
                    <Thead backgroundColor='blue.100'>
                        <Tr>
                            <Th>#</Th>
                            <Th>Nama Kategori</Th>
                            <Th>Status</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        { showCategoryList() }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CategoryList