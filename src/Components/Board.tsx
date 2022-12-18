import { Droppable } from '@hello-pangea/dnd'
import { type } from 'os';
import React, {useRef} from 'react'
import styled from 'styled-components';
import DraggableCard from './DraggableCard'

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}
const Area = styled.div<IArea>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#6c5ce7"
      : props.isDraggingFromThisWith
      ? "#636e72"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
interface IBoardProps{
    todos: string[];
    boardId: string;
}
export const Board = ({todos, boardId}:IBoardProps) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    inputEl.current?.focus()
  }
  return (
    <Droppable droppableId={boardId}>
      {(provided, info) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          <Title>{boardId}</Title>
          <input placeholder='write here' type='text' ref={inputEl }
           />
           <button onClick={onButtonClick}>Click</button>
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThisWith={Boolean(info.draggingFromThisWith)}
          >
            {todos.map((val, index) => (
              <DraggableCard key={val} index={index} value={val} />
            ))}
            {provided.placeholder}
          </Area>
        </Wrapper>
      )}
    </Droppable>
  );
}
