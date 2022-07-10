import React from "react"

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"

import image from "../../../images/whitebackground.png"

function Card ({ name, onCartClick }) {
    return (
        <div className="card shadow mb-4">
            <img src={image} className="card-img-top" alt={ name } />
            <div className="card-body">
                <h5 className="card-title text-primary fw-bold">{ name }</h5>
                <p className="card-text mb-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button 
                    className="btn btn-primary btn-sm w-100 align-items-center align-middle"
                    onClick={onCartClick}
                >
                        <i className="bi bi-bag-plus"></i>
                        <span> Keranjang</span>
                </button>
            </div>
        </div>
    )
}

export default Card