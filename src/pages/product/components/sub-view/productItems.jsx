import React from "react"

function ProductItems ({ index, name, bottle_stock, total_stock, price, unit, onDeleteBtnClick}) {
    return (
        <tr className="text-center">
            <td>{ index }</td>
            <td className="text-start">{ name }</td>
            <td>{ bottle_stock }</td>
            <td className="text-end">
                <span className="me-2">
                    { Intl.NumberFormat('id-ID', { style: "decimal" }).format(total_stock)}
                </span>
                <span className="ms-2">
                    { unit }
                </span>
            </td>
            <td>
                <span className="me-2">
                    { Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR"}).format(price) }
                </span>
                <span className="ms-2">
                    { ' /' + unit }
                </span>
            </td>
            <td style={{ width: "1%", whiteSpace: "nowrap" }}>
                <div className="btn btn-sm btn-light border border-dark mx-2">Edit</div>
                <div className="btn btn-sm btn-danger mx-2" onClick={onDeleteBtnClick}>Delete</div>
            </td>
        </tr>
    )
}

export default ProductItems