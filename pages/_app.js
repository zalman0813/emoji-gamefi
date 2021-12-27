import { Container } from 'semantic-ui-react';

import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css';
import Header from "../components/Header";

function EmojiGamfi({ Component, pageProps }) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
     
  )
  
}

export default EmojiGamfi
