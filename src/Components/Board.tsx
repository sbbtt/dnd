import { Droppable } from '@hello-pangea/dnd'
import React from 'react'
import styled from 'styled-components';
import DraggableCard from './DraggableCard'
const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IBoardProps{
    todos: string[];
    boardId: string;
}
export const Board = ({todos, boardId}:IBoardProps) => {
  return (
    <Droppable droppableId={boardId}>
    {(provided) => (
      <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
        <Title>{boardId}</Title>
        {todos.map((val, index) => (
          <DraggableCard key={val} index={index} value={val}/>
        ))}
        {provided.placeholder}
      </Wrapper>
    )}
  </Droppable>
  )
}
