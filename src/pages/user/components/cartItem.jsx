import React, { useState } from "react"
import axios from "axios"

import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import dummy_img from "../../../../src/images/whitebackground.png"
import { getUserInfo } from "../../../utils"

function CartItem ({ product_id, volume, price, name, abbreviation, onDeleteClick, isCheckout, loadCart }) {
    const user_id = getUserInfo().id
    const API_URL = process.env.REACT_APP_API_URL
    
    const [ totalPrice, setTotalPrice ] = useState(Number(price) * Number(volume))
    const [ totalVolume, setTotalVolume ] = useState(Number(volume))

    const onVolumeChange = (event) => {
        setTotalVolume(Number(event.target.value))
        setTotalPrice(Number(event.target.value) * price)

        const data = {
            user_id: user_id,
            product_id: product_id,
            volume: event.target.value
        }

        axios.post(`${API_URL}/cart/update`, data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
            
            loadCart()
    }

    const onPlusClick = () => {
        const user_id = getUserInfo().id
        const incTotalVolume = totalVolume + 1
        setTotalVolume(incTotalVolume)

        console.log(incTotalVolume)

        const data = {
            user_id: user_id,
            product_id: product_id,
            volume: incTotalVolume
        }

        axios.post(`${API_URL}/cart/update`, data)
        .then((response) => {
            console.log(response)
            setTotalPrice(price * totalVolume)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const onMinClick = () => {
        const user_id = getUserInfo().id
        const decTotalVolume = totalVolume - 1
        setTotalVolume(decTotalVolume)

        console.log(totalVolume)

        const data = {
            user_id: user_id,
            product_id: product_id,
            volume: decTotalVolume
        }

        axios.post(`${API_URL}/cart/update`, data)
        .then((response) => {
            console.log(response)
            setTotalPrice(price * totalVolume)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="d-flex w-100">
                    <div className="w-25 me-2">
                        <img src={dummy_img} alt="" />
                    </div>
                    <div className="w-50 mx-2 d-flex flex-column justify-content-center">
                        <p>{name}</p>
                        <p className="mb-2">{totalVolume + ' ' + abbreviation}</p>
                        <div className="d-flex w-100 justify-content-between border-top pt-2">
                            <p>Total Belanja:</p>
                            <p className="fw-bold">{new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(totalPrice)}</p>
                        </div>
                    </div>
                    <div className="w-25 ms-2 d-flex flex-column align-items-center justify-content-center">
                        <div className="d-flex w-100 mb-3">
                            {/* <button className="btn btn-sm btn-light" onClick={onMinClick}>-</button> */}
                            <input type="number" min={1} className="form-control mx-2 text-center" defaultValue={totalVolume} onChange={onVolumeChange} disabled={isCheckout}/>
                            {/* <button className="btn btn-sm btn-light" onClick={onPlusClick}>+</button> */}
                        </div>
                        {!isCheckout && <button className="btn btn-sm btn-danger w-100" onClick={onDeleteClick}>Hapus</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem