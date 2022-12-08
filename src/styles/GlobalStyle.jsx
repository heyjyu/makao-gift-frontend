import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    color: #303030;
  }
  
  a {
    color: black;
    text-decoration: none;
  }
`;

export default GlobalStyle;
