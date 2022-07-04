import React from "react"

import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

function SidebarItem (props) {
    return (
        <div className="p-2 border-bottom border-warning">
            <a href={props.url}>{ props.text }</a>
        </div>
    )
}

export default SidebarItem