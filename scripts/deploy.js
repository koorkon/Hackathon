async function main() {
  try {
    const LandRegistry = await ethers.getContractFactory("LandRegistry");
    console.log("Deploying LandRegistry...");
    
    const landRegistry = await LandRegistry.deploy();
    await landRegistry.waitForDeployment();
    
    const address = await landRegistry.getAddress();
    console.log("LandRegistry deployed to:", address);
    
    // Verify deployment
    const code = await ethers.provider.getCode(address);
    if (code === "0x") throw new Error("Contract not deployed");
    
    console.log("Deployment verified successfully!");
    return address;
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

main()
  .then((address) => {
    console.log("Contract address:", address);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });