import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <Wrapper className='page'>
      <div>
        <h1>404</h1>
        <h4>page not found</h4>
        <Link to='/' className='btn'>
          Back Home
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  text-align: center;
  padding-top: 5rem;
  h1 {
    font-size: 9rem;
  }
`;

export default Error;
