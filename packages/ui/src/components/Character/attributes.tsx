import React, { FC } from 'react';
import styled from 'styled-components';
import { Bar } from '../Bar';

const StyledAttributeHeading = styled.span``;

const StyledAttributePart = styled.div`
  font-size: 0.9em;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 50% 50%;
  align-items: baseline;
  margin: 0 0.5em;
`;

export interface IAttributeTrops {
  age: number;
  happiness: number;
  hunger: number;
}

const StyledAttributes = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Attributes: FC<IAttributeTrops> = ({ age, happiness, hunger }) => {
  return (
    <StyledAttributes>
      <StyledAttributePart>
        <StyledAttributeHeading>Age</StyledAttributeHeading>
        <Bar value={age} min={1} max={3} />
      </StyledAttributePart>
      <StyledAttributePart>
        <StyledAttributeHeading>Happiness</StyledAttributeHeading>
        <Bar value={happiness} min={1} max={10} />
      </StyledAttributePart>
      <StyledAttributePart>
        <StyledAttributeHeading>Hunger</StyledAttributeHeading>
        <Bar value={hunger} min={1} max={10} />
      </StyledAttributePart>
    </StyledAttributes>
  );
};
