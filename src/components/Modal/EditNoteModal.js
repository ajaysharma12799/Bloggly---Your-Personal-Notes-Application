import { Box, Button } from '@chakra-ui/react'
import ReactModal from 'react-modal';
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import { useFormik } from 'formik';
import { updateDoc, doc } from '@firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';

ReactModal.setAppElement('#react-modal-portal');

const EditNoteModal = ({ editModalIsOpen, toggleModal, currentNoteObj }) => {

    const handleUpdateFunctionality = async (notesObj) => {
        try {
            const noteID = currentNoteObj && currentNoteObj.id;
            const docRef = doc(db, 'notes', noteID);

            const updatedNoteObj = {
                ...notesObj,
                createdAt: currentNoteObj && currentNoteObj.data.createdAt,
            }

            await updateDoc(docRef, updatedNoteObj);
            toast.success('Note Updated Sucessfully');
            toggleModal();
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            title: currentNoteObj && (currentNoteObj.data.title || ''),
            description: currentNoteObj && (currentNoteObj.data.description || ''),
        },
        enableReinitialize: true, // If Data Take Some time to load then it will be re-filled again
        onSubmit: (value) => {
            handleUpdateFunctionality(value);
        }
    });

    return (
        <Box className='relative'>
            <ReactModal
                isOpen={editModalIsOpen}
                onRequestClose={toggleModal}
                className='absolute top-[25%] left-[5%] md:left-[30%] w-[90%] md:w-[40%] bg-slate-300 rounded-lg px-5 py-5'
            >
                <Box className='w-fit ml-auto'>
                    <Button
                        onClick={toggleModal}
                        _hover={false}
                        bgColor='red.500'
                        color={'white'}
                    >
                        <AiOutlineClose />
                    </Button>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <TextInput
                        placeholder={'Enter Title'}
                        name='title'
                        type={'text'}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    <TextArea
                        placeholder={'Enter Description'}
                        name='description'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    <Button
                        className='w-full'
                        _hover={false}
                        bgColor={'#3944f7'}
                        color={'#ffffff'}
                        type={'submit'}
                    >
                        Edit Note
                    </Button>
                </form>
            </ReactModal>
        </Box>
    )
}

export default EditNoteModal