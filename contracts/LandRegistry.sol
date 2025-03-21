// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandRegistry {
    struct Land {
        uint256 id;
        string location;
        uint256 area;
        string ipfsHash;
        address currentOwner;
        bool isVerified;
    }
    
    mapping(uint256 => Land) public lands;
    uint256 public landCount;
    
    event LandRegistered(uint256 indexed id, address indexed owner);
    event LandTransferred(uint256 indexed id, address indexed from, address indexed to);
    event LandVerified(uint256 indexed id);
    
    function registerLand(string memory _location, uint256 _area, string memory _ipfsHash) public {
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(_area > 0, "Area must be greater than 0");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(msg.sender != address(0), "Invalid sender address");
        
        landCount++;
        lands[landCount] = Land(
            landCount,
            _location,
            _area,
            _ipfsHash,
            msg.sender,
            false
        );
        
        emit LandRegistered(landCount, msg.sender);
    }
    
    function transferLand(uint256 _landId, address _newOwner) public {
        require(_landId > 0 && _landId <= landCount, "Invalid land ID");
        require(_newOwner != address(0), "Invalid new owner address");
        require(lands[_landId].currentOwner == msg.sender, "Not the owner");
        require(lands[_landId].isVerified, "Land not verified");
        
        lands[_landId].currentOwner = _newOwner;
        emit LandTransferred(_landId, msg.sender, _newOwner);
    }
    
    function verifyLand(uint256 _landId) public {
        require(_landId > 0 && _landId <= landCount, "Invalid land ID");
        require(!lands[_landId].isVerified, "Land already verified");
        lands[_landId].isVerified = true;
        emit LandVerified(_landId);
    }
    
    // Add these new functions after verifyLand function
    function getLand(uint256 _landId) public view returns (Land memory) {
        require(_landId > 0 && _landId <= landCount, "Invalid land ID");
        return lands[_landId];
    }
    
    function getLandsByOwner(address _owner) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](landCount);
        uint256 counter = 0;
        
        for(uint256 i = 1; i <= landCount; i++) {
            if(lands[i].currentOwner == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        
        uint256[] memory ownerLands = new uint256[](counter);
        for(uint256 i = 0; i < counter; i++) {
            ownerLands[i] = result[i];
        }
        
        return ownerLands;
    }
}