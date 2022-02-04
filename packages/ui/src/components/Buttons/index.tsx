import React, { FC } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from 'urql';
import { LongCharacter } from '../../types/global';

const petMutation = gql`
  mutation ($id: Int!) {
    petCharacter(id: $id) {
      id
      name
      description
      age
      happiness
      hunger
    }
  }
`;

const feedMutation = gql`
  mutation ($id: Int!) {
    feedCharacter(id: $id) {
      id
      name
      description
      age
      happiness
      hunger
    }
  }
`;

const createCharacterMutation = gql`
  mutation ($name: String!, $desc: String!) {
    createCharacter(name: $name, description: $desc) {
      id
      name
      description
      age
      happiness
      hunger
    }
  }
`;

const StyledButton = styled.button`
  background: #f46099;
  height: 3.4em;
  width: 3.4em;
  border-radius: 100%;
  border: 4px solid #b00c6f;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  color: white;
  font-weight: 700;
  pointer-events: all;
`;

export interface IButtonProps {
  onClick?: () => void;
}

const Button: FC<IButtonProps> = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const StyledButtons = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 12em;
  margin-top: 21.5em;
  pointer-events: none;
`;

export interface IButtonsProps {
  id: number;
}

export const Buttons: FC<IButtonsProps> = ({ id, ...restProps }) => {
  const [feedResult, feed] =
    useMutation<{ character: LongCharacter }>(feedMutation);
  const [petResult, pet] =
    useMutation<{ character: LongCharacter }>(petMutation);
  const [createCharacterResult, createCharacter] = useMutation<{
    character: LongCharacter;
  }>(createCharacterMutation);

  //   function createCharacter() {
  //     const [result] = useMutation<{ character: LongCharacter }>({
  //       query: createCharacterMutation,
  //       variables: { name: 'Heikki', desc: 'pikkuheikki' },
  //     });
  //   }

  return (
    <StyledButtons {...restProps}>
      <Button onClick={() => feed({ id })}>feed</Button>
      <Button onClick={() => pet({ id })}>pet</Button>
      <Button
        onClick={() => createCharacter({ name: 'Heikki', desc: 'pikkuheikki' })}
      >
        +
      </Button>
    </StyledButtons>
  );
};
