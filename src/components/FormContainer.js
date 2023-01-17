import { Box, Input } from '@chakra-ui/react'
import React from 'react'

const FormContainer = ({ searchQuery, setSearchQuery }) => {
    return (
        <Box className='mb-[5%] w-[95%] md:w-full mx-auto'>
            <Input
                placeholder='Type Something...'
                size={'lg'}
                backgroundColor={'#ffffff'}
                focusBorderColor={'#3944f7'}
                _hover={false}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                type={'text'}
            />
        </Box>
    )
}

export default FormContainer