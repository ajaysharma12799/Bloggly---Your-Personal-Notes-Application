import { Box, Heading } from '@chakra-ui/layout'
import { collection, orderBy, onSnapshot, query } from '@firebase/firestore'
import React, { useState, useEffect } from 'react'
import { db } from '../config/firebase'
import CreateNoteCard from './Card/CreateNoteCard'
import NoteCard from './Card/NoteCard'
import { toast } from 'react-toastify';

const NotesContainer = ({ toggleModal, toggleEditModal, setCurrentNoteObj, searchQuery }) => {
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    const fetchAllNotes = async () => {
        try {
            setLoading(true);
            const qry = await query(collection(db, 'notes'), orderBy('createdAt', 'desc')); // Building Query to Fetch All Notes

            await onSnapshot(qry, (querySnapshot) => {
                setNotes(querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })))
            });
            setLoading(false);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchAllNotes();
    }, []);

    const filteredNotes = notes.filter((note) => note.data.title.toLowerCase().includes(searchQuery)); // Filter Notes Based on Search Query

    return (
        <Box className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <CreateNoteCard toggleModal={toggleModal} />
            {
                loading ? (<Box className=''>
                    <Heading className=''>Loading...</Heading>
                </Box>) : (
                    filteredNotes.map((note) => <NoteCard note={note} key={note.id} toggleModal={toggleEditModal} setCurrentNoteObj={setCurrentNoteObj} />)
                )
            }
        </Box>
    )
}

export default NotesContainer