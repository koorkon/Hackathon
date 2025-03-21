import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast
} from '@chakra-ui/react';
import { create } from 'ipfs-http-client';

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: 'Bearer ' + process.env.VITE_INFURA_API_KEY,
  },
});

function LandRegistrationForm({ account }) {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    documents: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!formData.documents) {
        throw new Error('Please select a document');
      }

      const file = formData.documents;
      const result = await ipfs.add(file);
      
      toast({
        title: "Success",
        description: "Land registration initiated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        location: '',
        area: '',
        documents: null
      });
      
    } catch (error) {
      console.error("Error registering land:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to register land",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" mb={4} fontWeight="bold" color="gray.700">
        Register New Land
      </Text>
      <Box
        as="form"
        onSubmit={handleSubmit}
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="sm"
        position="relative"
      >
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Enter land location"
              _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px blue.400" }}
              disabled={isSubmitting}
            />
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Area (in sq. meters)</FormLabel>
            <Input 
              type="number"
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
              placeholder="Enter land area"
              _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px blue.400" }}
              disabled={isSubmitting}
              min="0"
            />
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Documents</FormLabel>
            <Input
              type="file"
              onChange={(e) => setFormData({...formData, documents: e.target.files[0]})}
              accept=".pdf,.jpg,.jpeg,.png"
              p={1}
              disabled={isSubmitting}
            />
          </FormControl>
          
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            size="lg"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            isLoading={isSubmitting}
            loadingText="Registering..."
          >
            Register Land
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default LandRegistrationForm;