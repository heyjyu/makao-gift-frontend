import styled from 'styled-components';

const Button = styled.button`
  font-size: 1em;
  font-weight: 700;
  width: 25em;
  height: 3.75em;
  border: none;
  border-radius: 0.5em;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  cursor: pointer;

  :hover {
    font-weight: 700;
    width: 25em;
    height: 3.75em;
    border: none;
    border-radius: 0.5em;
    background: ${(props) => props.theme.colors.primary};
    color: #006148;
    cursor: pointer;
  }
  
  :active {
    font-weight: 700;
    width: 25em;
    height: 3.75em;
    border: none;
    border-radius: 0.5em;
    background: #006148;
    color: white;
    cursor: pointer;
  }

  :disabled {
    font-weight: 700;
    width: 25em;
    height: 3.75em;
    border: none;
    border-radius: 0.5em;
    background: #8D8D8D;
    color: white;
  }
`;

export default Button;
