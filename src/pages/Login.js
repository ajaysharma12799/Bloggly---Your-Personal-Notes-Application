import { Box, Button, Divider, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import TextInput from '../components/common/TextInput'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
// import { collection, getDoc } from 'firebase/firestore';
import { auth } from '../config/firebase'
import { useFormik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (value) => {
            console.log(value);
            loginUserWithEmailAndPassword(value);
        }
    });

    const loginUserWithEmailAndPassword = async (userObj) => {
        try {
            const userCrendentials = await signInWithEmailAndPassword(auth, userObj.email, userObj.password);
            const user = userCrendentials.user;

            console.log(userCrendentials);
            console.log(user);
            toast.success('LoggedIn Successfully')
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <Box className='container mx-auto my-[5%] w-[90%] md:w-1/2'>
            <Box className='my-1'>
                <form onSubmit={formik.handleSubmit}>
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
                        type='submit'
                    >
                        Login
                    </Button>
                </form>
            </Box>
            <Box className='my-5'>
                <Text>
                    Don't Have Account,{" "}
                    <Link to={'/register'} className='text-blue-500'>
                        Click Here to Register
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

export default Login