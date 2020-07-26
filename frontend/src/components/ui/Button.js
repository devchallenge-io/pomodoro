import styled from 'styled-components';

export default styled.button`
  padding: 15px;

  background-color: var(--background2);
  color: var(--foreground);

  border-radius: 5px;
  border: none;
  box-shadow: 1px 3px 5px #24283a;

  font-size: 25px;
  font-weight: 600;

  cursor: pointer;

  :hover {
    filter: brightness(120%)
  }
`;