import {useForm} from 'react-hook-form'
import { Droppable } from '@hello-pangea/dnd'
import React, {useRef} from 'react'
import styled from 'styled-components';
import DraggableCard from './DraggableCard'
import { ITodo } from '../atoms';

interface IForm {
  toDo: string
}

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
const Form = styled.form`
  width: 90%;
  input {
    width: 90%;
  }
`
interface IBoardProps{
    todos: ITodo[];
    boardId: string;
}
export const Board = ({todos, boardId}:IBoardProps) => {
  const {register,setValue, handleSubmit} = useForm<IForm>();
  const onValid = ({toDo}:IForm)=>{
    console.log(toDo)
    setValue('toDo', '')
  }
  return (
    <Droppable droppableId={boardId}>
      {(provided, info) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add Tasks ${boardId}`}
            />
          </Form>
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThisWith={Boolean(info.draggingFromThisWith)}
          >
            {todos.map((val, index) => (
              <DraggableCard
                key={val.id}
                index={index}
                valueId={val.id}
                valueText={val.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        </Wrapper>
      )}
    </Droppable>
  );
}
