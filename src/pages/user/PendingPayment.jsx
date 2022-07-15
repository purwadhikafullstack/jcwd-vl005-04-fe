import React, { useState, useEffect } from "react"
import axios from "../../lib/axios";
import { useToast } from "@chakra-ui/react"
import Header from "./components/header"
import { Badge, Button, Card } from "react-bootstrap"
import { getUserInfo, openInNewTab, snakeToTitle } from "../../utils";
import { useNavigate } from "react-router-dom"
import formatThousands from "format-thousands";

function PendingPayment() {
    const [pendingList, setPendingList] = useState([]);
    const navigate = useNavigate();

    const toast = useToast()
    const userInfo = getUserInfo()


    const showToast = (type = 'success', description = 'Operation Success') => {
        return toast({
            title: type,
            description: description,
            status: type,
            duration: 3000,
            isClosable: true,
        })
    }

    useEffect(() => {
        if (userInfo) {
            axios.get(`api/checkout/pending-payment`, { params: { user_id: userInfo.id } })
                .then((response) => {
                    setPendingList(response.data)
                })
                .catch((error) => {
                    console.log(error)
                    showToast('error', 'Gagal mendapatkan pending payment')
                })
        }
    }, [])

    if (!userInfo) {
        navigate('/')
        return
    }


    return (
        <>
            <Header />
            <div className="p-4">
                <div className="w-50 mx-auto mb-3">
                    {pendingList && pendingList.length > 0 ? pendingList.map((el) => {
                        let badgeColor = undefined
                        let onClickFn = () => {
                            navigate(`/upload-payment?transaction_id=${el.id}`)
                        }
                        let btnText =snakeToTitle(el.status)
                        switch (el.status) {
                            case "approved":
                                badgeColor = "success"
                                btnText = "Paid"
                                break;
                            case "pending":
                                badgeColor = "warning"

                                break;
                            case "in_review":
                                badgeColor = "info"
                                onClickFn = openInNewTab(el.payment_proof_path)
                                break;
                        }

                        return <button className="w-100 mb-3" onClick={onClickFn}>
                            <Card>
                                <Card.Body>
                                    <strong>{`INVOICE ${el.inv_number} - Rp${formatThousands(el.total_payment, ".")}`}</strong>
                                    &nbsp;&nbsp;
                                    {<Badge bg={badgeColor}>{btnText}</Badge>}
                                </Card.Body>
                            </Card>
                        </button>
                    }) : <div className="text-center"><strong>No Pending Payment</strong></div>}
                </div>
            </div>
        </>
    )
}

export default PendingPayment