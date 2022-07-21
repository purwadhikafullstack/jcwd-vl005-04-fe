import React from "react"
import { Badge, Button, ButtonGroup, Td, Tr } from "@chakra-ui/react"

function CategoryItems ({index, name, status, deleteClick, restoreClick, editClick}) {
    return (
        <Tr>
            <Td style={{ width: '1%', whiteSpace: 'no-wrap', textAlign: 'center' }}>{ index }</Td>
            <Td>{ name }</Td>
            <Td>
                { status ? 
                    <Badge colorScheme='green'>Aktif</Badge>
                    :
                    <Badge colorScheme='red'>Tidak Aktif</Badge>
                }
            </Td>
            <Td>
                <ButtonGroup gap='3'>
                    <Button size='sm' onClick={editClick}>Edit</Button>
                    { status ? 
                        <Button size='sm' colorScheme='red' onClick={deleteClick}>Non Aktifkan</Button>
                        :
                        <Button size='sm' colorScheme='green' onClick={restoreClick}>Aktifkan</Button>
                    }
                </ButtonGroup>
            </Td>
        </Tr>
    )
}

export default CategoryItems