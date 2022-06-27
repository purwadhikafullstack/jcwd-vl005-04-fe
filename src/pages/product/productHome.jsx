import React from "react"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import SidebarMain from "./components/sidebar/sidebarMain"
import MainContent from "./components/main-content/mainContent"
import Header from "./components/header/header"
import ProductCreate from "./productCreate"

function ProductHome () {
    const url = window.location.pathname
    console.log(url)

    const showPage = () => {
        switch (url) {
            case '/admin/products':
                return <MainContent />
            
            case '/admin/products/create':
                return <ProductCreate />

            default:
                return null
        }
    }

    return (
        <div className="w-100">
            <div className="d-flex" style={{ height: "100vh" }}>
                <div className="" style={{ width: "15%" }}>
                    <SidebarMain />
                </div>
                <div style={{ width: "85%" }}>
                    <Header />
                    { showPage() }
                </div>
            </div>
        </div>
    )
}

export default ProductHome