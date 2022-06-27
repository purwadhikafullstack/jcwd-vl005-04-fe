import React from "react"

function CategoryItems ({index, name, status, deleteClick, restoreClick, editClick}) {
    return (
        <tr>
            <td className="text-center">{ index }</td>
            <td>{ name }</td>
            <td className="text-center">
                { status ? 
                    <span className="bg-success rounded p-2 text-white fw-bold">Aktif</span>    
                    :
                    <span className="bg-danger rounded p-2 text-white fw-bold">Tidak Aktif</span>
                }
            </td>
            <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                <button className="btn btn-sm btn-light border border-dark mx-2" onClick={editClick}>Edit</button>
                { status ? 
                    <button className="btn btn-sm btn-danger mx-2" onClick={deleteClick}>Non Aktifkan</button>
                    :
                    <button className="btn btn-sm btn-success mx-2" onClick={restoreClick}>Aktifkan</button>
                }
            </td>
        </tr>
    )
}

export default CategoryItems