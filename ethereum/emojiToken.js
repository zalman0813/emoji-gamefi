import {ethers} from 'ethers'
import EMOJIToken from './artifacts/ethereum/contracts/EMOJIToken.sol/EMOJIToken.json'
import provider from './provider'
import { emojiTokenAddress } from '@/root/config'

const instance =  new ethers.Contract(emojiTokenAddress, EMOJIToken.abi, provider)

export default instance;