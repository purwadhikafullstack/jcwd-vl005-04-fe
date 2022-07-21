import React from "react"
import { Button, ButtonGroup, Flex, Td, Text, Tr } from "@chakra-ui/react"

function ProductItems ({ index, name, bottle_stock, total_stock, price, unit, onDeleteBtnClick}) {
    return (
        <Tr textAlign='center'>
            <Td style={{ width: "1%", whiteSpace: "nowrap" }}>{ index }</Td>
            <Td textAlign='start'>{ name }</Td>
            <Td>{ Intl.NumberFormat('id-ID', { style: "decimal" }).format(bottle_stock)}</Td>
            <Td>
                <Flex justifyContent='end'>
                    <Text me={2}>
                        { Intl.NumberFormat('id-ID', { style: "decimal" }).format(total_stock)}
                    </Text>
                    <Text ms={2}>
                        { unit }
                    </Text>
                </Flex>
            </Td>
            <Td>
                <Flex justifyContent='end'>
                    <Text me={2}>
                        { Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR"}).format(price) }
                    </Text>
                    <Text ms={2}>
                        { ' /' + unit }
                    </Text>
                </Flex>
            </Td>
            <Td>
                <ButtonGroup spacing='3'>
                    <Button colorScheme='gray' size='sm'>Edit</Button>
                    <Button colorScheme='red' size='sm' onClick={ onDeleteBtnClick }>Delete</Button>
                </ButtonGroup>
            </Td>
        </Tr>
    )
}

export default ProductItems