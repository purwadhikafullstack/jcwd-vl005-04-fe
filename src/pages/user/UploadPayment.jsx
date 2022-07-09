import React, { useState } from "react"
import axios from "../../lib/axios";
import { useToast } from "@chakra-ui/react"
import Header from "./components/header"
import { Button, Form } from "react-bootstrap"
import { getUserInfo } from "../../utils";
import { useNavigate, useLocation } from "react-router-dom"
import qs from "query-string";

function Checkout() {
    const parsed = qs.parse(useLocation().search);
    const navigate = useNavigate();

    const toast = useToast()
    const userInfo = getUserInfo()

    const [file, setFile] = useState(null);

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

    const onSubmit = (e) => {
        e.preventDefault()
        if (!file) {
            showToast('error', 'Pilih file untuk di-upload')
        }

        const formData = new FormData();
        formData.append('file', file)
        formData.append('transaction_id', parsed.transaction_id)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(`/api/checkout/upload-payment`, formData, config)
            .then((response) => {
                showToast('success', 'Berhasil upload')
                navigate("/pending-payment")
            })
            .catch((error) => {
                showToast('error', 'Gagal upload')
                console.log(error)
            })
    }

    return (
        <>
            <Header />
            <div className="small-box">
                <Form.Group className="mb-3">
                    <Form.Label>Bukti Pembayaran</Form.Label>
                    <Form.Control
                        type="file"
                        placeholder="Bukti Pembayaran"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                </Form.Group>
                <Form onSubmit={onSubmit}>
                    <Button className="w-100" type="submit">Upload</Button>
                </Form>
            </div>
        </>
    )
}

export default Checkout