import { useProductStore } from "@/store/product";
import { Container, VStack,Text ,Link as ChakraLink, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
//  Box, Input, Button, Heading,  SimpleGrid,
import { Link as RouterLink } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
const HomePage = () => {
  const {fetchProducts,products}= useProductStore();
  useEffect(()=>{
  fetchProducts();
  },[fetchProducts]
);
console.log("products",products);
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}> 
        <Text
      fontSize={"30"}
      fontWeight="bold"
      textAlign="center"
      bgClip="text"
    >
      Current Products
    </Text>

    <SimpleGrid 
    columns={{
      base:1,
      md:2,
      lg:3
    }}
    spacing={10}
    width={"full"}>
      {products.map((product)=>(
        <ProductCard key={product._id} product={product}/>
      ))}


    </SimpleGrid>

    
    {products.length === 0 && (
      <Text fontSize="xl" textAlign="center" fontWeight="bold">
      No products found !<br/>
      <ChakraLink as={RouterLink} to="/create">Create a Product</ChakraLink>
    </Text>
    )}

      </VStack>
    </Container>
  )
}

export default HomePage