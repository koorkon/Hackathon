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
        require(lands[_landId].currentOwner == msg.sender, "Not the owner");
        require(lands[_landId].isVerified, "Land not verified");
        
        lands[_landId].currentOwner = _newOwner;
        emit LandTransferred(_landId, msg.sender, _newOwner);
    }
    
    function verifyLand(uint256 _landId) public {
        // In production, add proper access control
        lands[_landId].isVerified = true;
        emit LandVerified(_landId);
    }
}