import React from "react"
import { useToast } from "@chakra-ui/react"

function ShowToast (props) {
    const toast = useToast()

    return toast({
        title: props.status,
        status: props.status,
        description: props.description,
        duration: 3000,
        isClosable: true,
    })
}

export default ShowToast