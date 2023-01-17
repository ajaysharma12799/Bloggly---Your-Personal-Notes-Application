import { Card, CardHeader } from '@chakra-ui/react'
import { GrAdd } from 'react-icons/gr';
import React from 'react'

const CreateNoteCard = ({ toggleModal }) => {
    return (
        <Card
            bgColor={'white'}
            onClick={toggleModal}
            className='w-[90%] md:w-full h-[200px] cursor-pointer rounded-lg border-2 mx-auto'
        >
            <CardHeader className='text-[3rem] mx-auto my-auto'>
                <GrAdd />
            </CardHeader>
        </Card>
    )
}

export default CreateNoteCard