// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract EMOJIFactory is ERC721URIStorage{
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	// address of marketplace for NFTs to interact
	address contractAddress;
	uint randNonce = 0;

	mapping(uint256 => string) tokenIdToEmojiType;

	constructor(address marketplaceAddress) ERC721('EMOJINFT', 'EMOZ') {
        contractAddress = marketplaceAddress;
    }

	event Create(string emojiType);

	function randMod(uint _modulus) internal returns(uint)
		{
		// increase nonce
		randNonce++; 
		return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
		}

	function _createEmoji() internal returns(string memory) {
		
		uint rand = randMod(100);
		if (rand <= 60 ) {
			return 'smile';
		}
		if (rand > 60 && rand <= 90 ) {
			return 'smiley';
		}

		return 'satisfied';
  }

	function mintToken(string memory tokenURI) internal returns(uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
		string memory emojiType = _createEmoji();
		tokenIdToEmojiType[newItemId] = emojiType;
        _mint(msg.sender, newItemId);
        // set the token URI: id and url
        _setTokenURI(newItemId, tokenURI);
        // give the marketplace the approval to transact between users
        setApprovalForAll(contractAddress, true);
        // mint the token and set it for sale - return the id to do so
		emit Create(emojiType);
        return newItemId;
	}
}