import {ethers} from 'ethers'
const { Component } = require("react/cjs/react.production.min");
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Router from 'next/router';
import provider from '@/ethereum/provider'
import emojiOwnership from '@/ethereum/emojiOwnership'
import emojiToken from '@/ethereum/emojiToken'
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
				// We are in the browser and metamask is running.
			const signer = provider.getSigner();
			const emojiOwnershipWithSigner = emojiOwnership.connect(signer);
			console.log('this.state.ammount.toString:', this.state.ammount.toString());
			await emojiOwnershipWithSigner.exchangeTokens(amount.toString(), price, {
					value: price
				} );
			
			
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
				// We are in the browser and metamask is running.
				const signer = provider.getSigner();
				const account = await signer.getAddress();
				const emoTokens = await emojiToken.balanceOf(account);
				console.log('emoTokens: ', emoTokens.toString());
				this.setState({ balance: emoTokens.toString });
			
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