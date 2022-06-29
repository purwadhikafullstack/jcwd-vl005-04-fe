import React from "react"

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Button, ButtonGroup, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from "@chakra-ui/react"

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
        submit }
    ) {

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
            <FormControl isRequired className="mb-3">
                <FormLabel htmlFor='name'>Nama Produk</FormLabel>
                <Input 
                    id='name' 
                    ref={refName}
                    type='text' 
                    placeholder="Contoh: Asam Mefenamat"
                    onChange={nameChange}
                />
            </FormControl>

            <div className="d-flex w-100">
                <FormControl isRequired className="mb-3 me-2">
                    <FormLabel htmlFor='type'>Tipe Produk</FormLabel>
                    <Select id='type' ref={refType} placeholder='Pilih tipe produk' onChange={typeChange}>
                        { showProductTypes() }
                    </Select>
                </FormControl>

                <FormControl className="mb-3 ms-2">
                    <FormLabel htmlFor='category'>Kategori Produk</FormLabel>
                    <Select id='category' ref={refCategory} placeholder='Pilih kategori produk'>
                        { showProductCategories() }
                    </Select>
                </FormControl>
            </div>

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

            <div className="d-flex w-100 mb-3">
                <div className="pe-2" style={{ width: '60%' }}>
                    <FormControl className="mb-3">
                        <FormLabel htmlFor='bottle_capacity'>Kapasitas Botol</FormLabel>
                        <NumberInput min={0} onChange={capacityChange}>
                            <NumberInputField id='bottle_capacity' />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </div>
                <div className="ps-2" style={{ width: '40%' }}>
                    <FormControl isRequired className="mb-3">
                        <FormLabel htmlFor='type'>Satuan Produk</FormLabel>
                        <Select id='type' ref={refUnit} placeholder='Pilih satuan produk' onChange={unitChange}>
                            { showProductUnits() }
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="d-flex w-100 mb-3">
                <div className="pe-2" style={{ width: '60%' }}>
                    <FormControl className="mb-3">
                        <FormLabel htmlFor='bottle_stock'>Total Stok</FormLabel>
                        <NumberInput min={0} onChange={totalQtyChange}>
                            <NumberInputField id='bottle_stock' />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </div>
                <div className="ps-2" style={{ width: '40%' }}>
                    <FormControl isRequired className="mb-3">
                        <FormLabel htmlFor='price'>Harga Eceran</FormLabel>
                        <NumberInput min={0} onChange={priceChange}>
                            <NumberInputField id='price' />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </div>
            </div>

            <div className="d-flex w-100 justify-content-end">
                <ButtonGroup gap='3'>
                    <Button colorScheme='red'>Batal</Button>
                    <Button isDisabled={btnDisabled} colorScheme='green' onClick={submit}>Tambah</Button>
                </ButtonGroup>
            </div>
        </>
    )
}

export default ProductCreate