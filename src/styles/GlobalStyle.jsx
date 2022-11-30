import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }
  
  a {
    color: black;
    text-decoration: none;
  }
`;

export default GlobalStyle;
