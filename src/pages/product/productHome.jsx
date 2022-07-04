import React from "react"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

import SidebarMain from "./components/sidebar/sidebarMain"
import MainContent from "./mainContent"
import Header from "./components/header/header"
import CategoryList from "./categoryList"

function ProductHome () {
    const url = window.location.pathname

    const showPage = () => {
        switch (url) {
            case '/admin/products':
                return <MainContent />
            
            case '/admin/products/category-list':
                return <CategoryList />

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
                    <div className="p-4">
                        { showPage() }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductHome