import React from "react"
import { Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import logoHeader from "../../../images/logo_header.png"

function Header({ isAuth }) {
    const navigate = useNavigate()
    const isLogin = localStorage.getItem("access_token") !== null

    const onLogout = () => {
        localStorage.removeItem("access_token");
        navigate('/login');
    }

    return (
        <div className="p-4 bg-primary fw-bold text-white">
            <div className="d-flex justify-content-between">
                <Link to="/" style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                }}><Image src={logoHeader} style={{
                    height: "70px",
                    padding: "10px",
                }} /></Link>
                <div style={{ marginLeft: "160px" }}>
                    <Link to="/">Home</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {isLogin ? <a href="/pending-payment">Status Payment</a> : null}
                </div>
                {!isAuth ? <div>
                    <Link to={isLogin ? "/cart" : "/login"}>Cart&nbsp;<i className="bi bi-bag"></i></Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {isLogin ? <button onClick={onLogout}>Logout</button> : <Link to="/login"><button>Login</button></Link>}
                </div> : null}

            </div >
        </div >
    )
}

export default Header