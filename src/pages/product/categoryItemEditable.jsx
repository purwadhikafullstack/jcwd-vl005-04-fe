import React from "react"
import { Badge, Button, ButtonGroup, Input, Td, Tr } from "@chakra-ui/react"

function CategoryItemEditable ({index, name, status, cancelClick, saveClick, nameUpdate}) {
    return (
        <Tr>
            <Td style={{ width: '1%', whiteSpace: 'no-wrap', textAlign: 'center' }}>{ index }</Td>
            <Td>
                <Input placeholder={name} onChange={nameUpdate} />
            </Td>
            <Td>
                { status ? 
                    <Badge colorScheme='green'>Aktif</Badge>
                    :
                    <Badge colorScheme='red'>Tidak Aktif</Badge>
                }
            </Td>
            <Td>
                <ButtonGroup gap='3' size='sm'>
                    <Button colorScheme='red' onClick={cancelClick}>Batal</Button>
                    <Button colorScheme='green' onClick={saveClick}>Simpan</Button>
                </ButtonGroup>
            </Td>
        </Tr>
    )
}

export default CategoryItemEditable