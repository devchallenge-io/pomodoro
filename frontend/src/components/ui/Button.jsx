// import React from 'react';
import styled from 'styled-components';

import device from './utils/device';

export default styled.button`
  padding: 15px;

  background-color: var(--background2);
  color: var(--foreground);

  border-radius: 7.5px;
  border: none;
  box-shadow: 1px 3px 5px #24283a;

  font-size: 25px;
  font-weight: 600;

  cursor: pointer;

  ::selection {
    background-color: red;
  }

  :hover {
    filter: brightness(120%)
  }

  @media ${device.tablet} {
    :hover {
      filter: brightness(100%)
    }

    :active {
      filter: brightness(120%)
    }
  }
`;