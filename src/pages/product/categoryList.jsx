import axios from "axios"
import React, { useEffect, useState } from "react"

import { Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import CategoryItems from "./components/sub-view/categoryItems"
import { useRef } from "react"
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
            <div className="shadow p-4 mb-4 w-50 mx-auto">
                <div className="d-flex w-100">
                    <Input ref={newCategory} id='name' type='text' placeholder="Nama Kategori Baru" className="w-75 me-2" onChange={onNewCategoryChange}/>
                    <Button colorScheme='blue' className="w-25 ms-2" isDisabled={isDisabled} onClick={onAddClick}>Tambah</Button>
                </div>
            </div>
            <div className="table-responsive shadow rounded">
                <table className="table align-middle">
                    <thead>
                        <tr className="text-center fw-bold table-primary">
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { showCategoryList() }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryList