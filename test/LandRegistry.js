const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LandRegistry", function () {
  let LandRegistry;
  let landRegistry;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    LandRegistry = await ethers.getContractFactory("LandRegistry");
    landRegistry = await LandRegistry.deploy();
    await landRegistry.waitForDeployment();
  });

  describe("Land Registration", function () {
    it("Should register a new land", async function () {
      await landRegistry.registerLand("Test Location", 100, "ipfs_hash_here");
      const land = await landRegistry.lands(1);
      expect(land.location).to.equal("Test Location");
      expect(land.area).to.equal(100);
      expect(land.ipfsHash).to.equal("ipfs_hash_here");
      expect(land.currentOwner).to.equal(owner.address);
    });

    it("Should emit LandRegistered event", async function () {
      await expect(landRegistry.registerLand("Test Location", 100, "ipfs_hash_here"))
        .to.emit(landRegistry, "LandRegistered")
        .withArgs(1, owner.address);
    });
  });

  describe("Land Transfer", function () {
    beforeEach(async function () {
      await landRegistry.registerLand("Test Location", 100, "ipfs_hash_here");
      await landRegistry.verifyLand(1);
    });

    it("Should transfer land ownership", async function () {
      await landRegistry.transferLand(1, addr1.address);
      const land = await landRegistry.lands(1);
      expect(land.currentOwner).to.equal(addr1.address);
    });
  });

  describe("Land Verification", function () {
    beforeEach(async function () {
      await landRegistry.registerLand("Test Location", 100, "ipfs_hash_here");
    });

    it("Should verify land", async function () {
      await landRegistry.verifyLand(1);
      const land = await landRegistry.lands(1);
      expect(land.isVerified).to.be.true;
    });
  });
});