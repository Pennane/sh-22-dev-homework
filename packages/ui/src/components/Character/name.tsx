import React, { FC } from 'react';
import styled from 'styled-components';

const NameContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 2fr 1fr;
  align-items: center;
  justify-items: center;

  width: inherit;

  margin: 0.5em;
  font-weight: 800;
`;

const StyledName = styled.span`
  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 0.8em;
`;

const NameSpecifier = styled.span`
  justify-self: baseline;
  font-size: 0.7em;
  letter-spacing: -0.1em;
  margin: 0.3rem;
  font-weight: 400;
`;

export interface INameProps {
  name: string;
  currentIndex: number;
  amount: number;
}

export const Name: FC<INameProps> = ({ name, currentIndex, amount }) => {
  return (
    <NameContainer>
      <StyledName>{name}</StyledName>
      <NameSpecifier>
        {currentIndex + 1} / {amount}
      </NameSpecifier>
    </NameContainer>
  );
};
