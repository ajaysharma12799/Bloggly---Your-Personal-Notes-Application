import { Box, Textarea } from '@chakra-ui/react'
import React from 'react'

const TextArea = ({ placeholder, name, value, onChange }) => {
    return (
        <Box className='my-2 w-full'>
            <Textarea
                name={name}
                placeholder={placeholder}
                style={{ resize: 'none' }}
                rows={5}
                size={'lg'}
                backgroundColor={'#ffffff'}
                focusBorderColor={'#3944f7'}
                _hover={false}
                value={value}
                onChange={onChange}
            >
            </Textarea>
        </Box>
    )
}

export default TextArea