import React from "react"

import { FaPlus } from 'react-icons/fa'

import image from "../../../images/whitebackground.png"
import { Box, Button, Flex, GridItem, Image, Text } from "@chakra-ui/react"

function Card ({ product_id, name, qty, unit, price, img_path, onCartClick }) {
    const id = 'product_stock_' + product_id

    const mouseLeave = () => {
        document.getElementById(id).style.display = 'none'
    }

    const mouseOver = () => {
        document.getElementById(id).style.display = 'block'
    }

    return (
        <GridItem shadow='md' mb={4} borderRadius='lg' onMouseEnter={mouseOver} onMouseLeave={mouseLeave}> 
            <Image src={ img_path === null ? image : img_path } alt={ name } style={{ width: '100%', height: '150px', objectFit: 'cover' }} borderTopRadius='lg'/>
            <Box p={4}>
                <Text fontSize='xl' fontWeight='bold' mb={4}>{ name }</Text>
                <Text mb={5}>{ new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(price) } /{ unit }</Text>
                <Box id={id} display='none'>
                    <Flex justifyContent='space-between' mb={5}>
                        <Text>Stock: </Text>
                        <Text align='end'>{ new Intl.NumberFormat('id-ID').format(qty) } { unit }</Text>
                    </Flex>
                </Box>
                <Button colorScheme='blue' size='sm' w='100%' onClick={onCartClick} gap={1.5}>
                    <FaPlus />
                    Keranjang
                </Button>
            </Box>
        </GridItem>
    )
}

export default Card