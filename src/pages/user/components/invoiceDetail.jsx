import React from 'react'
function InvoiceDetail(data){
    const transaction = data.transaction
    const details = data.details
    const index = data.index
    return(
        <tr>
            <td>
                {index+1}
            </td>
            <td>
                {details[index].name}
            </td>
            <td>
                Rp. {details[index].price_per_unit}
            </td>
            <td>
                {details[index].volume} bottle
            </td>
            <td>
                {details[index].total_quantity} {details[index].unit_name}
            </td>
            <td>
                Rp. {details[index].price}
            </td>
        </tr>
    )
}
export default InvoiceDetail