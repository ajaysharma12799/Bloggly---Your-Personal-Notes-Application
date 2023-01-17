import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import FormContainer from './components/FormContainer';
import CreateNoteModal from './components/Modal/CreateNoteModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotesContainer from './components/NotesContainer';
import EditNoteModal from './components/Modal/EditNoteModal';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentNoteObj, setCurrentNoteObj] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  }

  const toggleEditModal = () => {
    setEditModalIsOpen(!editModalIsOpen);
  }

  return (
    <Box className='py-5'>
      <ToastContainer />
      <Box className='container mx-auto'>
        <FormContainer searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <NotesContainer 
          toggleModal={toggleModal} 
          toggleEditModal={toggleEditModal} 
          setCurrentNoteObj={setCurrentNoteObj}
          searchQuery={searchQuery}
        />
      </Box>
      <CreateNoteModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleModal}
      />
      <EditNoteModal
        editModalIsOpen={editModalIsOpen}
        toggleModal={toggleEditModal}
        currentNoteObj={currentNoteObj}
      />
    </Box>
  )
}

export default App