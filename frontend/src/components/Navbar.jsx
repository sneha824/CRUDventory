import { Container, Flex, Text, Link as ChakraLink, HStack, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {

  return (
    <Container maxW="1140px" px={4}>
  <Flex
    h={16}
    alignItems="center"
    justifyContent="space-between"
    flexDir={{ base: "column", sm: "row" }}
  >
    <Text
      fontSize={{ base: "22px", sm: "28px" }}
      fontWeight="bold"
      textTransform="uppercase"
      textAlign="center"
      bgGradient="linear(to-r, cyan.400, blue.500)"
      bgClip="text"
    >
      <ChakraLink as={RouterLink} to="/">Product Store</ChakraLink>
    </Text>

    <HStack spacing={2} alignItems={"center"}>
        <ChakraLink as={RouterLink} to="/create" _hover={{ textDecoration: "none" }}>
            <Button>Create</Button>
        </ChakraLink>
    </HStack>   
  </Flex>
</Container>
  );
};

export default Navbar;
