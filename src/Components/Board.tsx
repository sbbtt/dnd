import {useForm} from 'react-hook-form'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import React, {useRef} from 'react'
import styled from 'styled-components';
import DraggableCard from './DraggableCard'
import { ITodo, todoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

interface IForm {
  toDo: string
}
interface IBoardProps {
  todos: ITodo[];
  boardId: string;
  index: number;
}

interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Wrapper = styled.div`
  width: 300px;
  padding: 10px 0px;
  padding-bottom: 0;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 15px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
const Error = styled.p`
  color: #e84393;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: 4px;
`;
const Area = styled.div<IArea>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.isDraggingOver
      : props.isDraggingFromThis
      ? props.theme.isDraggingFromThis
      : 'transparent'};
  transition: background-color 0.2s ease-in-out;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    width: 100%;
    height: 34px;
    border: none;
    background-color: ${(props) => props.theme.cardColor};
    padding: 0px 8px;
    outline: none;
    color: white;
    ::placeholder {
      color: white;
    }
  }
`;
export const Board = ({todos, boardId, index}:IBoardProps) => {
  const setTodos = useSetRecoilState(todoState)
  const {register,setValue, handleSubmit, clearErrors,
    formState: { errors },} = useForm<IForm>({
    mode: 'onChange'
  });
  const onValid = ({toDo}:IForm)=>{
    clearErrors();
    const newTodo = {
      id: Date.now(),
      text: toDo,
    }
    setTodos(allBoards =>{
      return{
        ...allBoards,
        [boardId]: [
          ...allBoards[boardId], newTodo
        ]
      }
    })
    setValue('toDo', '')
  }
  return (
    <Draggable draggableId={boardId} index={index} key={boardId}>
      {(magic) => (
        <Wrapper
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          ref={magic.innerRef}
        >
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              type="text"
              placeholder={`Add task on ${boardId}`}
              autoComplete="off"
              {...register('toDo', { required: 'we need some text!!' })}
            />
            {errors.toDo && <Error>{errors.toDo.message}</Error>}
          </Form>
          <Droppable droppableId={boardId}>
            {(magic, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={!!info.draggingFromThisWith}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {todos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}
