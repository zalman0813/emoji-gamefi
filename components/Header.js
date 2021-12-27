import React, { useState } from "react";
import { Menu, Segment } from 'semantic-ui-react';
import Link from "next/link";
const Header = (props) => {
	const [state, setState] = useState({
		activeItem: ''
	});

  const handleItemClick = (e, { name }) => setState({ activeItem: name })
  return (
     <Segment inverted>
	 <Menu inverted secondary>
	   <Menu.Item
		 name='Home'
		 active={state.activeItem === 'Home'}
		 onClick={handleItemClick}
		 to='/'
		 exact="true" 
	   />
	   <Menu.Item
		 name='Market'
		 active={state.activeItem === 'Market'}
		 onClick={handleItemClick}
	   />
	   <Menu.Item
		 name='MyEmoji'
		 active={state.activeItem === 'MyEmoji'}
		 onClick={handleItemClick}
	   />
	   <Menu.Item
		 name='ExchangeTokens'
		 active={state.activeItem === 'ExchangeTokens'}
		 href='/exchange'
		 onClick={handleItemClick}
	   />
	 </Menu>
   </Segment>
  );
};
export default Header;