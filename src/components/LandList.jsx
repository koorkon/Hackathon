import { Box, Grid, Text, Badge, VStack } from '@chakra-ui/react';

function LandList({ account }) {
  // This is a placeholder. You'll need to fetch actual land data from your smart contract
  const lands = []; 

  return (
    <Box>
      <Text fontSize="2xl" mb={4} fontWeight="bold" color="gray.700">
        Registered Lands
      </Text>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {lands.map((land) => (
          <Box
            key={land.id}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            boxShadow="sm"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
          >
            <VStack align="start" spacing={3}>
              <Text fontWeight="bold" fontSize="lg">
                Location: {land.location}
              </Text>
              <Text>Area: {land.area} sq. meters</Text>
              <Badge 
                colorScheme={land.isVerified ? 'green' : 'yellow'}
              >
                {land.isVerified ? 'Verified' : 'Pending Verification'}
              </Badge>
              <Text fontSize="sm" color="gray.500">
                Owner: {land.currentOwner}
              </Text>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default LandList;