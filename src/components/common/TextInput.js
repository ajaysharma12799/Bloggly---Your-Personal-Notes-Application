import { Box, Input } from '@chakra-ui/react'
import React from 'react'

const TextInput = ({ placeholder, name, type, value, onChange }) => {
    return (
        <Box className='my-2 w-full'>
            <Input
                type={type}
                name={name}
                placeholder={placeholder}
                size={'lg'}
                backgroundColor={'#ffffff'}
                focusBorderColor={'#3944f7'}
                _hover={false}
                value={value}
                onChange={onChange}
            />
        </Box>
    )
}

export default TextInput