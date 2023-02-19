import { Box, Card, CardHeader, Heading, Text } from '@chakra-ui/react'
import { ImBin } from 'react-icons/im'
import  { AiFillEdit } from 'react-icons/ai'
import React from 'react'
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import { deleteDoc, doc } from '@firebase/firestore';

const NoteCard = ({ note, toggleModal, setCurrentNoteObj }) => {

    const handleDelete = async (id) => {
      try {
        const docRef = doc(db, "notes", id); // Generation Current Document Reference with Note ID
        await deleteDoc(docRef);
        toast.success("Note Deleted Successfully");
      } catch (error) {
        toast.error(error.message);
      }
    };

    const handleUpdate = async () => {
      try {
        setCurrentNoteObj(note);
        toggleModal();
      } catch (error) {
        toast.error(error.message);
      }
    };

    return (
        <React.Fragment>
        <Card
            bgColor={'white'}
            className='w-[90%] md:w-full h-[200px] cursor-pointer rounded-lg relative mx-auto border-2'
        >
            <CardHeader className='my-auto overflow-y-scroll'>
                <Heading>{note.data.title}</Heading>
                <Text className='text-justify'>
                    {note.data.description}
                </Text>
            </CardHeader>
            <Box
                onClick={() => handleDelete(note.id)}
                className='absolute top-[-15px] right-[-15px] w-fit text-[#ffffff] bg-red-500 rounded-full p-2 cursor-pointer'>
                <Box className='text-xl'>
                    <ImBin />
                </Box>
            </Box>
            <Box
                onClick={() => handleUpdate()}
                className='absolute top-[-15px] right-[30px] w-fit text-[#ffffff] bg-blue-500 rounded-full p-2 cursor-pointer'>
                <Box className='text-xl'>
                    <AiFillEdit />
                </Box>
            </Box>
        </Card>
        </React.Fragment>
    )
}

export default NoteCard