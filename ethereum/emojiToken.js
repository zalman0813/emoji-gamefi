import {ethers} from 'ethers'
import EMOJIToken from './artifacts/ethereum/contracts/EMOJIToken.sol/EMOJIToken.json'
import { signer } from './web3'

export default ( address, signerOrProvider ) => {
	return new ethers.Contract(address, EMOJIToken.abi, signer)

}