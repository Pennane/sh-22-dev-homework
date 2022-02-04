import React, { FC } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from 'urql';
import { LongCharacter } from '../../types/global';
import { Attributes } from './attributes';
import { CharacterImage } from './image';
import { Name } from './name';

const query = gql`
  query ($id: Int!) {
    character(id: $id) {
      id
      name
      description
      age
      happiness
      hunger
    }
  }
`;

const StyledCharacter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 12.5em;
  height: 13.2em;
  margin-top: 4.4em;
`;

export interface ICharacterProps {
  name: string;
  id: number;
  currentIndex: number;
  amount: number;
}

export const Character: FC<ICharacterProps> = ({
  name,
  id,
  currentIndex,
  amount,
  ...restProps
}) => {
  const [result] = useQuery<{ character: LongCharacter }>({
    query,
    variables: { id },
  });

  if (!result || !result.data) return null;

  const { age, happiness, hunger, ...character } = result.data.character;
  return (
    <StyledCharacter {...restProps}>
      <Name name={name} amount={amount} currentIndex={currentIndex} />
      <CharacterImage age={age} id={character.id} />
      <Attributes age={age} happiness={happiness} hunger={hunger} />
    </StyledCharacter>
  );
};
