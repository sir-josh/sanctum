// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts@4.9.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.9.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.9.0/utils/Counters.sol";

contract SanctumVerificationBadge is ERC721, ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  address sanctum;

  modifier onlySanctum() {
    require(msg.sender == sanctum, "Only Sanctum allowed");
    _;
  }

  constructor(address _sanctum) ERC721("Sanctum Verification Badge", "CVB") {
    sanctum = _sanctum;
  }

  function safeMint(address to) public onlySanctum {
    _tokenIdCounter.increment();
    uint256 tokenId = _tokenIdCounter.current();
    _safeMint(to, tokenId);
    _setTokenURI(
      tokenId,
      "https://bafybeiaovcphcjqf7y52v6e6bukooewlzkidopw6ntxllgrt6scfxeycci.ipfs.nftstorage.link/Badge.svg"
    );
  }

  function burn(uint256 tokenId) external {
    require(
      ownerOf(tokenId) == msg.sender,
      "Only owner of the token can burn it"
    );
    _burn(tokenId);
  }

  // The following functions are overrides

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721) {
    require(from == address(0) || to == address(0), "Token not transferable");
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721URIStorage) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
