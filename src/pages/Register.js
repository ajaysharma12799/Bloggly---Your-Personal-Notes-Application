import { Box, Button, Divider, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import TextInput from '../components/common/TextInput'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { db, auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            displayName: '',
            email: '',
            password: '',
        },
        onSubmit: (value) => {
            console.log(value);
            registerWithEmailAndPassword(value);
        }
    });

    const registerWithEmailAndPassword = async (userObj) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, userObj.email, userObj.password);
            const user = response.user;

            console.log(response);
            console.log(user);

            await addDoc(collection(db, 'users'), {
                id: user.uid,
                displayName: (user.displayName && user.displayName) || userObj.displayName,
                email: user.email,
                authProvider: 'local',
                notes: [],
            });
            toast.success('User Registered Successfully');
            formik.resetForm();
            navigate('/dashboard');
        } catch (error) {   
            console.log(error.message);
            console.log(error.code);
            toast.error(error.message);
        }
    }

    return (
        <Box className='container mx-auto my-[5%] w-[90%] md:w-1/2'>
            <Box className='my-1'>
                <form onSubmit={formik.handleSubmit}>
                    <TextInput
                        placeholder={'Enter Username'}
                        name='displayName'
                        type={'text'}
                        value={formik.values.displayName}
                        onChange={formik.handleChange}
                    />
                    <TextInput
                        placeholder={'Enter Email'}
                        name='email'
                        type={'email'}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <TextInput
                        placeholder={'Enter Password'}
                        name='password'
                        type={'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <Button
                        className='w-full'
                        size={'lg'}
                        bg={'#3944f7'}
                        color={'white'}
                        _hover={false}
                        type={'submit'}
                    >
                        Register
                    </Button>
                </form>
            </Box>
            <Box className='my-5'>
                <Text>
                    Already Have Account,{" "}
                    <Link to={'/login'} className='text-blue-500'>
                        Click Here to Login
                    </Link>
                </Text>
            </Box>
            <Divider />
            <Box className='mx-auto w-fit my-5 text-3xl'>
                <IconButton>
                    <FcGoogle className='text-3xl' />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Register