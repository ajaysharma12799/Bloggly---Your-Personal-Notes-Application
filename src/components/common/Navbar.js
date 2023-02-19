import React from 'react'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Navbar = ({ currentUser }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await signOut(auth);
        toast.success("Logout Successfully");
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    };

    return (
      <Box className="bg-[#3944f7] text-[#ffffff] py-3 px-3 md:px-0">
        <Flex className="w-[90%] container mx-auto items-center justify-between">
          <Box>
            <Heading>
              <Link to={currentUser ? "/dashboard" : "/"}>Bloggly</Link>
            </Heading>
          </Box>
          <Flex className="items-center gap-5">
            <Text className="font-bold text-xl">
              {(currentUser && currentUser.displayName) ||
                (currentUser && currentUser.email)}
            </Text>
            {currentUser ? (
              <Button
                color={"white"}
                bgColor={"red.500"}
                _hover={false}
                borderRadius={0}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link to={"/login"}>
                <Button color={"black"} _hover={false} borderRadius={0}>
                  Login
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Box>
    );
}

export default Navbar