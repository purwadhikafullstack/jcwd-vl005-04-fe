import React, { useState } from "react"
import axios from "axios"

import dummy_img from "../../../../src/images/whitebackground.png"

import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react"
import { AddIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons"

import { getUserInfo } from "../../../utils"
import { useLocation } from "react-router-dom"

function CartItem ({ product_id, volume, price, name, abbreviation, onDeleteClick, updateTotal }) {
    const user_id = getUserInfo().id
    const API_URL = process.env.REACT_APP_API_URL
    const label = 'product_' + product_id
    
    const [ totalVolume, setTotalVolume ] = useState(Number(volume))
    const location = useLocation().pathname;

    const onVolumeChange = (event) => {
        setTotalVolume(Number(event.target.value))

        updateTotal()

        const data = {
            user_id: user_id,
            product_id: product_id,
            volume: event.target.value
        }

        axios.post(`${API_URL}/cart/update`, data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const onQtyClick = (number) => {
        const newVolume = totalVolume + number
        setTotalVolume(newVolume)

        const numberInput = document.getElementById(label)
        numberInput.value = newVolume
        
        const data = {
            user_id: user_id,
            product_id: product_id,
            volume: newVolume
        }
        axios.post(`${API_URL}/cart/update`, data)
            .then((response) => {
                console.log(response)
                updateTotal()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Box shadow='md' borderRadius={20}>
            <Flex gap='3' p={5} alignItems='center'>
                <Flex w='10%' alignItems='center' justifyContent='center' borderRightWidth={2} borderRightColor='blue.500' pe={4}>
                    <Button colorScheme='red' variant='outline' size='xs' onClick={onDeleteClick}><CloseIcon /></Button>
                </Flex>
                <Image boxSize='25%' objectFit='cover' borderRadius={10} src={dummy_img} />
                <Flex direction='column' grow={1}>
                    <Text>{ name }</Text>
                    <Text mb={2}>{ new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(price) } / {abbreviation}</Text>
                    {
                    location === "/checkout"?
                    <div>
                        Total Qty : {totalVolume}
                    </div>
                    :
                    <Flex borderTopWidth={1} pt={2} gap={4} justifyContent='end'>
                        <Button size='sm' variant='outline' colorScheme='blue' onClick={() => onQtyClick(-1)}><MinusIcon /></Button>
                        <Input id={label} type='number' w='20%' variant='unstyled' textAlign='center' defaultValue={ totalVolume } min={ 1 } onChange={ onVolumeChange } />
                        <Button size='sm' variant='outline' colorScheme='blue' onClick={() => onQtyClick(1)}><AddIcon /></Button>
                    </Flex>
                    }
                    
                </Flex>
            </Flex>
        </Box>
    )
}

export default CartItem