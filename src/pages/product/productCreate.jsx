import React from "react"

import { 
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select 
} from "@chakra-ui/react"

function ProductCreate ({ 
        types, 
        units, 
        categories,
        refName,
        refType,
        refUnit,
        refCategory,
        nameChange, 
        typeChange, 
        unitChange, 
        priceChange,
        bottleStockChange,
        capacityChange,
        totalQtyChange,
        btnDisabled, 
        submit,
        cancel
    }) {

    const showProductTypes = () => {
        return types.map((type, index) => {
            return <option value={type.id}>{ type.name }</option>
        })
    }

    const showProductUnits = () => {
        return units.map((unit, index) => {
            return <option value={ unit.id }>{ unit.name }</option>
        })
    }

    const showProductCategories = () => {
        return categories.map((category, index) => {
            return <option value={ category.id }>{ category.name }</option>
        })
    }

    return (
        <>
            <FormControl isRequired mb={3}>
                <FormLabel htmlFor='name'>Nama Produk</FormLabel>
                <Input 
                    id='name' 
                    ref={refName}
                    type='text' 
                    placeholder="Contoh: Asam Mefenamat"
                    onChange={nameChange}
                />
            </FormControl>

            <Flex justifyContent='space-between' mb={3} gap='3'>
                <FormControl isRequired>
                    <FormLabel htmlFor='type'>Tipe Produk</FormLabel>
                    <Select id='type' ref={refType} placeholder='Pilih tipe produk' onChange={typeChange} defaultValue={refType.current.value}>
                        { showProductTypes() }
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor='category'>Kategori Produk</FormLabel>
                    <Select id='category' ref={refCategory} placeholder='Pilih kategori produk' defaultValue={refCategory.current.value}>
                        { showProductCategories() }
                    </Select>
                </FormControl>
            </Flex>

            <FormControl className="mb-3">
                <FormLabel htmlFor='bottle_stock'>Stok Botol</FormLabel>
                <Input 
                    id='bottle_stock'
                    min={0} 
                    type='number' 
                    onChange={bottleStockChange}
                />
            </FormControl>

            <Flex justifyContent='space-between' gap='3' mb={3}>
                <FormControl w='60%'>
                    <FormLabel htmlFor='bottle_capacity'>Kapasitas Botol</FormLabel>
                    <Input 
                        id='bottle_capacity'
                        min={0} 
                        type='number' 
                        onChange={capacityChange}
                    />
                </FormControl>

                <FormControl isRequired w='40%'>
                    <FormLabel htmlFor='type'>Satuan Produk</FormLabel>
                    <Select id='type' ref={refUnit} placeholder='Pilih satuan produk' onChange={unitChange} defaultValue={refUnit.current.value}>
                        { showProductUnits() }
                    </Select>
                </FormControl>             
            </Flex>

            <Flex justifyContent='space-between' gap='3' mb={3}>
                <FormControl w='60%'>
                    <FormLabel htmlFor='total_stock'>Total Stok</FormLabel>
                    <Input 
                        id='total_stock'
                        min={0} 
                        type='number' 
                        onChange={totalQtyChange}
                    />
                </FormControl>

                <FormControl isRequired w='40%'>
                    <FormLabel htmlFor='price'>Harga Eceran</FormLabel>
                    <Input 
                        id='price'
                        min={0} 
                        type='number' 
                        onChange={priceChange}
                    />
                </FormControl>
            </Flex>

            <Flex justifyContent='end'>
                <ButtonGroup gap='3'>
                    <Button colorScheme='red' size='sm' onClick={cancel}>Cancel</Button>
                    <Button isDisabled={btnDisabled} colorScheme='green' size='sm' onClick={submit}>Submit</Button>
                </ButtonGroup>
            </Flex>
        </>
    )
}

export default ProductCreate