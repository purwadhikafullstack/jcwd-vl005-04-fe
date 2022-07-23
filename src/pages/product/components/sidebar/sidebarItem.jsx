import React from "react"
import { Link } from "@chakra-ui/react"

import '../../../../css/admin/adminSidebar.css'

function SidebarItem (props) {
    const itemClass = 'sidebar-link ' + (props.location === props.url ? 'sidebar-link-active' : '')
    console.log(props.url)

    return (
        <Link 
            p={2} 
            href={ props.url } 
            fontWeight='bold' 
            textColor='white' 
            borderBottomColor='white' 
            borderBottomWidth={4} 
            className={itemClass}
        >
            { props.text }
        </Link>
    )
}

export default SidebarItem