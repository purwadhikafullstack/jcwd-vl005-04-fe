import React from "react"

function CategoryItemEditable ({index, name, status, cancelClick, saveClick, nameUpdate}) {
    return (
        <tr>
            <td className="text-center">{ index }</td>
            <td>
                <input className="form-control" placeholder={name} onChange={nameUpdate} type='text' />
            </td>
            <td className="text-center">
                { status ? 
                    <span className="bg-success rounded p-2 text-white fw-bold">Aktif</span>    
                    :
                    <span className="bg-danger rounded p-2 text-white fw-bold">Tidak Aktif</span>
                }
            </td>
            <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
                <button className="btn btn-sm btn-danger mx-2" onClick={cancelClick}>Batal</button>
                <button className="btn btn-sm btn-success mx-2" onClick={saveClick}>Simpan</button>
            </td>
        </tr>
    )
}

export default CategoryItemEditable