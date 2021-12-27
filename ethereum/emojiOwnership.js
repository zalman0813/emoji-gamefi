import {ethers} from 'ethers'
import EMOJIOwnership from './artifacts/ethereum/contracts/EMOJIOwnership.sol/EMOJIOwnership.json'
// import { signer } from './web3'
import { emojiOwnershipAddress } from '@/root/config'

// const instance = new ethers.Contract(emojiOwnershipAddress, EMOJIOwnership.abi, signer)

// export default instance;

export default (signer) => {
    return new ethers.Contract(emojiOwnershipAddress, EMOJIOwnership.abi, signer)
};