import React from "react"

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"

function Header () {
    return (
        <div className="p-4 bg-primary fw-bold text-white">
            <div className="d-flex justify-content-between">
                <a href="/home">Product Page</a>
                <a href="/cart"><i className="bi bi-bag"></i></a>
            </div>
        </div>
    )
}

export default Header