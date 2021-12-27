import {ethers} from 'ethers'
const { Component } = require("react/cjs/react.production.min");
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Router from 'next/router';
import Web3Modal from 'web3modal'
import EMOJIOwnership from '@/ethereum/artifacts/ethereum/contracts/EMOJIOwnership.sol/EMOJIOwnership.json'
import EMOJIToken from '@/ethereum/artifacts/ethereum/contracts/EMOJIToken.sol/EMOJIToken.json'
// import { signer } from './web3'
import { emojiOwnershipAddress, emojiTokenAddress } from '@/root/config'
// import EMOJIOwnership from '@/ethereum/emojiOwnership';

class Exchange extends Component {
	state = {
		ammount: '',
		price: '',
		errorMessage: '',
        loading: false,
		balance: ''
	}
	
	onSubmit = async (event) => {
        event.preventDefault();
		
        this.setState({ loading: true, errorMessage: '' });
        try {
			const price = ethers.utils.parseUnits(this.state.price.toString(), 'ether');
			const amount = this.state.ammount*10**18;
			if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
				// We are in the browser and metamask is running.
				console.log("test")
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const emojiOwnership = new ethers.Contract(emojiOwnershipAddress, EMOJIOwnership.abi, signer);
				console.log('this.state.ammount.toString:', this.state.ammount.toString());
				await emojiOwnership.exchangeTokens(amount.toString(), price, {
					value: price
				} );
			  }
			
			
            Router.push({ pathname: '/' });
        } catch (err) {
			console.log(err)
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
        
    };

	onBalance = async (event) => {
		event.preventDefault();
		this.setState({ loading: true, errorMessage: '' });
        try {
			if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
				// We are in the browser and metamask is running.
				console.log("test")
				const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
				console.log('account:', account);
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const emojiToken = new ethers.Contract(emojiTokenAddress, EMOJIToken.abi, signer);
				const emoTokens = await emojiToken.balanceOf(account);
				console.log('emoTokens: ', emoTokens.toString());
				console.log('address:', emojiTokenAddress);
				this.setState({ balance: emoTokens.toString });
			  }
			
			
        } catch (err) {
			console.log(err)
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
	}

	render() {
		return (<div>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Group widths='equal'>
						<Form.Field>
								<label>EMO Amount</label>
								<Input fluid
									label="EMO"
									labelPosition='right'
									value={ this.state.ammount }
									onChange={ event => 
										this.setState( {
														ammount: event.target.value,
														price: event.target.value*0.0001,
														})
									}
								/>
						</Form.Field>
						<Form.Field>
							<label>Price</label>
							{this.state.price}
						</Form.Field>
					</Form.Group>
						
						
						<Button primary loading={this.state.loading}>Create!</Button>
						
					</Form>
					<Form onSubmit={this.onBalance}>
						<Form.Field>
							<label>EMO Balance</label>
							{this.state.balance}
						</Form.Field>
						<Button primary loading={this.state.loading}>Balance!</Button>
					</Form>
				</div>

		)
	}
}

export default Exchange;