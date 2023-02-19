import React from "react";
import { Box, Image, Heading } from "@chakra-ui/react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  if (currentUser) {
    return navigate("/dashboard");
  }
  return (
    <Box>
      <Box className="w-[90%] md:w-1/2 container mx-auto my-5">
        <Image src="/assets/Notes.svg" />
        <Heading className="my-5 text-center" size={"lg"}>
          Project is Completed You Can Test It
        </Heading>
      </Box>
    </Box>
  );
};

export default HomePage;
