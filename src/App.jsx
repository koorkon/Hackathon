import { ChakraProvider, Container, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import LandRegistrationForm from './components/LandRegistrationForm';
import LandList from './components/LandList';

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <Heading mb={8}>Indian Land Registry DApp</Heading>
        {account ? (
          <>
            <LandRegistrationForm account={account} />
            <LandList account={account} />
          </>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </Container>
    </ChakraProvider>
  );
}

export default App;