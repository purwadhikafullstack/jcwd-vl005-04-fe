import React from "react"

import { Box, Flex } from "@chakra-ui/react"

import SidebarMain from "./components/sidebar/sidebarMain"
import MainContent from "./mainContent"
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
        <Flex>
            <Box w='15%'>
                <SidebarMain />
            </Box>
            <Box w='85%' p={4}>
                { showPage() }
            </Box>
        </Flex>
    )
}

export default ProductHome