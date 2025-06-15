import { Container, VStack, Box, Input, Button, Heading } from "@chakra-ui/react";
import { useState } from "react"
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster"

const CreatePage = () => {
    const [newProduct,setNewProduct] = useState({
        name:"",
        price:"",
        image:"",
    });

    const {createProduct}=useProductStore()
    
    const handleAddProduct=async()=>{
        const {success,message}= await createProduct(newProduct);
        if(!success){
            toaster.create({
                title: "Error",
                description: message,
            })
        }
        else{
            toaster.create({
                title: "Success",
                description: message,
            })
        }
        setNewProduct({name:"",price:"",image:""}); //reset
    }
  return (
    <>
    <Toaster />
    <Container maxW={"container.sm"} p={8}>
        <VStack
            spacing={8}
        >
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>
            <Box
                w={"full"}
                p={8} rounded={"lg"} shadow={"md"}
            >
                <VStack spacing={4}>
                    <Input placeholder="Product Name" name="name" value={newProduct.name} 
                    onChange={(e)=> setNewProduct({...newProduct,name:e.target.value})}/>

                    <Input placeholder="Price" name="price" type="number" value={newProduct.price} 
                    onChange={(e)=> setNewProduct({...newProduct,price:e.target.value})}/>

                    <Input placeholder="Image URL" name="image" value={newProduct.image} 
                    onChange={(e)=> setNewProduct({...newProduct,image:e.target.value})}/>

                    <Button onClick={handleAddProduct} w="full">Add Product</Button>
                </VStack>

            </Box>
        </VStack>
    </Container>
    </>
  )
}

export default CreatePage;
