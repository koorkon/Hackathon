import { Box } from '@chakra-ui/react';
import LandRegistrationForm from './components/LandRegistrationForm';

function App() {
  return (
    <Box className="land-registry-app">
      <Box maxW="1200px" mx="auto" p={6}>
        <h1 className="app-header">Land Registry DApp</h1>
        <LandRegistrationForm />
      </Box>
    </Box>
  );
}

export default App;