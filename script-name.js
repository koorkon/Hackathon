import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "dZ0uscz8ApsCFY999KHPTG4WINQM49nG",  // Replace with your API key
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

async function getNFTs() {
  try {
    const nfts = await alchemy.nft.getNftsForOwner("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
    console.log(nfts);
  } catch (error) {
    console.error("Error fetching NFTs:", error);
  }
}

getNFTs();