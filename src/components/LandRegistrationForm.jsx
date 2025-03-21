import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, useToast } from '@chakra-ui/react';

function LandRegistrationForm() {
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    documents: null
  });

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>Register New Land</Text>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input 
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </FormControl>
      </VStack>
    </Box>
  );
}

export default LandRegistrationForm;