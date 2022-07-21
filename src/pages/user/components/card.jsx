import React from "react"

import { FaPlus } from 'react-icons/fa'

import image from "../../../images/whitebackground.png"
import { Box, Button, GridItem, Image, Text } from "@chakra-ui/react"

function Card ({ name, qty, unit, price, onCartClick }) {
    return (
        <GridItem shadow='md' mb={4} borderRadius='lg'> 
            <Image src={ image } alt={ name }/>
            <Box p={4}>
                <Text fontSize='xl' fontWeight='bold' mb={4}>{ name }</Text>
                <Text mb={5}>{ new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(price) } /{ unit }</Text>
                <Button colorScheme='blue' size='sm' w='100%' onClick={onCartClick} gap={1.5}>
                    <FaPlus />
                    Keranjang
                </Button>
            </Box>
        </GridItem>
    )
}

export default Card