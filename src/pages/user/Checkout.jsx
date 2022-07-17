import React, { useState, useEffect } from "react"
import axios from "../../lib/axios";
import { useDisclosure, useToast } from "@chakra-ui/react"
import Header from "./components/header"
import { Button, Form } from "react-bootstrap"
import formatThousands from "format-thousands"
import { getUserInfo } from "../../utils";
import { useNavigate } from "react-router-dom"
import CartItem from "./components/cartItem";
import { AlertError } from "../../utils";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

function Checkout() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [address, setAddress] = useState("");
    const [subDistrict, setSubDistrict] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");


    const navigate = useNavigate();

    const toast = useToast()
    const userInfo = getUserInfo()

    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0);
    const [shipperData, setShipperData] = useState([])
    const [addresses, setAddresses] = useState([])

    const [selectedAddress, setSelectedAddress] = useState(null)
    const [selectedShipping, setSelectedShipping] = useState(null)


    const loadAddress = () => {
        axios.get(`/api/checkout/user-addresses`, { params: { user_id: userInfo.id } })
            .then((response) => {
                if (response && response.data && response.data.length > 0) {
                    setAddresses(response.data)
                    setSelectedAddress(response.data[0].id)
                }
            })
            .catch((error) => {
                showToast('error', 'Gagal mendapatkan data')
                console.log(error)
            })
    }

    useEffect(() => {
        if (userInfo) {

            axios.get(`/api/checkout/shippers`)
                .then((response) => {
                    if (response && response.data && response.data.length > 0) {
                        setShipperData(response.data)
                        setSelectedShipping(response.data[0].id)
                    }
                })
                .catch((error) => {
                    showToast('error', 'Gagal mendapatkan data')
                    console.log(error)
                })

            axios.get(`api/cart/${userInfo.id}`)
                .then((response) => {
                    setCartItems(response.data)
                    let totalTemp = 0
                    for (let i = 0; i < response.data.length; i++) {
                        const item = response.data[i];
                        totalTemp += item.price*item.volume
                    }
                    setTotal(totalTemp)
                })
                .catch((error) => {
                    console.log(error)
                    showToast('error', 'Gagal mendapatkan barang dalam keranjang')
                })

            loadAddress()
        }
    }, [])

    if (!userInfo) {
        navigate('/')
        return
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

    const handleSubmitAddress = (e) => {
        e.preventDefault()
        if (address === null) {
            return AlertError("Invalid Address");
        }
        if (subDistrict === null) {
            return AlertError("Invalid Sub District");
        }
        if (district === null) {
            return AlertError("Invalid District");
        }
        if (city === null) {
            return AlertError("Invalid City");
        }
        if (postalCode === null) {
            return AlertError("Invalid Postal Code");
        }

        const data = {
            user_id: getUserInfo().id,
            address: address,
            sub_district: subDistrict,
            district: district,
            city: city,
            postal_code: postalCode,
        }

        axios.post(`/api/checkout/user-addresses`, data)
            .then((response) => {
                loadAddress()
                onClose()
                setAddress("")
                setSubDistrict("")
                setDistrict("")
                setCity("")
                setPostalCode("")
            })
            .catch((error) => {
                showToast('error', 'Failed to add new address')
                console.log(error)
            })

    }


    const onSubmit = (e) => {
        e.preventDefault()

        if (cartItems.length === 0) {
            return AlertError("Invalid products");
        }

        if (selectedAddress === null) {
            return AlertError("Invalid address");
        }

        if (selectedShipping === null) {
            return AlertError("Invalid shipping");
        }
        console.log(total)
        const data = {
            user_id: getUserInfo().id,
            products: cartItems,
            address_id: Number(selectedAddress),
            shipper_id: Number(selectedShipping),
            total_payment: total,
            // payment_proof_path: ?,
        }
        axios.post(`/api/checkout/order`, data)
            .then((response) => {
                showToast('success', 'Berhasil checkout')
                navigate(`/upload-payment?transaction_id=${response.data.transaction_id}`)
                return
            })
            .catch((error) => {
                showToast('error', 'Gagal checkout')
                console.log(error)
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
                    isCheckout={true}
                />
            )
        })
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Form onSubmit={handleSubmitAddress} className="mb-3">
                        <ModalHeader>Add New Address</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <hr className="mb-4" />
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder={"Address"}
                                    label={"Address"}
                                    value={address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Sub District</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    placeholder={"SubDistrict"}
                                    label={"Sub District"}
                                    value={subDistrict}
                                    onChange={(e) => {
                                        setSubDistrict(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>District</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    placeholder={"District"}
                                    label={"District"}
                                    value={district}
                                    onChange={(e) => {
                                        setDistrict(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    placeholder={"City"}
                                    label={"City"}
                                    value={city}
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>PostalCode</Form.Label>
                                <Form.Control
                                    type={"number"}
                                    placeholder={"Postal Code"}
                                    label={"Postal Code"}
                                    value={postalCode}
                                    onChange={(e) => {
                                        if (e.target.value.length >= 6) {
                                            return
                                        }
                                        setPostalCode(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" >
                                Submit
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant='secondary' onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </Form>
                </ModalContent>
            </Modal >

            <Header />
            <div className="p-4">
                <div className="w-50 mx-auto mb-3">
                    {showCartItems()}
                    <strong><h4>Total: {formatThousands(total, ".")}</h4></strong>
                </div>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Select className="mb-3" onChange={(e) => { setSelectedAddress(e.target.value) }}>
                        {addresses.map((el, index) => {
                            return <option key={index} value={el.id}>{`${el.address}, ${el.sub_district}, ${el.district}, ${el.city} ${el.postal_code}`}</option>
                        })}
                    </Form.Select>
                    <Button variant="secondary" onClick={onOpen}>Add New Address</Button>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Courier</Form.Label>
                    <Form.Select onChange={(e) => { setSelectedShipping(e.target.value) }}>
                        {shipperData.map((el, index) => {
                            return <option key={index} value={el.id}>{el.name} - Rp{formatThousands(el.price, ".")}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form onSubmit={onSubmit}>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </>
    )
}

export default Checkout