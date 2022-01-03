import {ethers} from 'ethers'
import EMOJIOwnership from './artifacts/ethereum/contracts/EMOJIOwnership.sol/EMOJIOwnership.json'
import provider from './provider'
import { emojiOwnershipAddress } from '@/root/config'


const instance = new ethers.Contract(emojiOwnershipAddress, EMOJIOwnership.abi, provider)
export default instance;
