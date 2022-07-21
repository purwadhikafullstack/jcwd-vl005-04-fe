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
        cancel,
        imgChange
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
                    <Select id='type' ref={refType} placeholder='Pilih tipe produk' onChange={typeChange}>
                        { showProductTypes() }
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor='category'>Kategori Produk</FormLabel>
                    <Select id='category' ref={refCategory} placeholder='Pilih kategori produk'>
                        { showProductCategories() }
                    </Select>
                </FormControl>
            </Flex>

            <FormControl className="mb-3">
                <FormLabel htmlFor='bottle_stock'>Stok Botol</FormLabel>
                <NumberInput min={0} onChange={bottleStockChange}>
                    <NumberInputField id='bottle_stock'/>
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>

            <Flex justifyContent='space-between' gap='3' mb={3}>
                <FormControl w='60%'>
                    <FormLabel htmlFor='bottle_capacity'>Kapasitas Botol</FormLabel>
                    <NumberInput min={0} onChange={capacityChange}>
                        <NumberInputField id='bottle_capacity' />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>

                <FormControl isRequired w='40%'>
                    <FormLabel htmlFor='type'>Satuan Produk</FormLabel>
                    <Select id='type' ref={refUnit} placeholder='Pilih satuan produk' onChange={unitChange}>
                        { showProductUnits() }
                    </Select>
                </FormControl>             
            </Flex>

            <Flex justifyContent='space-between' gap='3' mb={3}>
                <FormControl w='60%'>
                    <FormLabel htmlFor='bottle_stock'>Total Stok</FormLabel>
                    <NumberInput min={0} onChange={totalQtyChange}>
                        <NumberInputField id='bottle_stock' />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>

                <FormControl isRequired w='40%'>
                    <FormLabel htmlFor='price'>Harga Eceran</FormLabel>
                    <NumberInput min={0} onChange={priceChange}>
                        <NumberInputField id='price' />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
            </Flex>

            {/* <FormControl mb={3}>
                <FormLabel htmlFor='image'>Upload Gambar</FormLabel>
                <Input type='file' id='image' accept='images/*' onChange={imgChange}/>
            </FormControl> */}

            <Flex justifyContent='end'>
                <ButtonGroup gap='3'>
                    <Button colorScheme='red' size='sm' onClick={cancel}>Batal</Button>
                    <Button isDisabled={btnDisabled} colorScheme='green' size='sm' onClick={submit}>Tambah</Button>
                </ButtonGroup>
            </Flex>
        </>
    )
}

export default ProductCreate