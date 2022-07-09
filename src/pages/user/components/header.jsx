import React from "react"
import { useNavigate } from "react-router-dom"

function Header() {
    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.removeItem("access_token");
        navigate('/login');
    }

    return (
        <div className="p-4 bg-primary fw-bold text-white">
            <div className="d-flex justify-content-between">
                <div>
                    <a href="/">Product Page</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="/pending-payment">Pending Payment</a>
                </div>
                <div>
                    <a href="/cart"><i className="bi bi-bag"></i></a>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={onLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Header