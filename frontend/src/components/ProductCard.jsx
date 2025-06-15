import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  Popover,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  if (!product) {
    return <Text color="red.500">Product not found</Text>;
  }

  const { deleteProduct, updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    toaster.create({
      title: success ? "Success" : "Error",
      description: success ? "Product updated successfully" : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg="white"
      p={6}
      m={6}
    >
      <Toaster />
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2} color="black">
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" mb={4} color="black">
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <Popover.Root open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
            <Popover.Trigger asChild>
              <Button colorPalette="blue" size="sm">
                Edit
              </Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <VStack spacing={3}>
                      <Input
                        placeholder="Product Name"
                        value={updatedProduct.name}
                        onChange={(e) =>
                          setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) =>
                          setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        value={updatedProduct.image}
                        onChange={(e) =>
                          setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                        }
                      />
                      <HStack>
                        <Button colorScheme="blue" onClick={handleUpdateProduct}>
                          Update
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                          Cancel
                        </Button>
                      </HStack>
                    </VStack>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>

          <Button
            onClick={() => handleDeleteProduct(product._id)}
            colorPalette="red"
            size="sm"
          >
            Delete
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
