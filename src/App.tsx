import { DragDropContext, Droppable, DragStart } from "@hello-pangea/dnd";
import { RecoilState, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BoardState, todoState, TrashState } from "./atoms";
import { Board } from "./Components/Board";
import DraggableCard from "./Components/DraggableCard";
import TrashCan from "./Components/Trash";
import { onDrageEnd } from "./Feature";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const Title = styled.h1`
  position: absolute;
  top: 25px;
  left: 25px;
  font-size: 1.5rem;
  font-weight: 600;
`;



function App() {
  const [todos, setTodos] =useRecoilState(todoState);
  const [boards, setBoards] = useRecoilState(BoardState);
  const setTrashCan = useSetRecoilState(TrashState);
  const onDragStart = (info: DragStart) => {
    if (info.type === 'DEFAULT') setTrashCan(true);
  };
  return (
    <>
      <DragDropContext onDragEnd={(info)=>{
        onDrageEnd(info, setBoards, setTodos, setTrashCan)
      }}
      onDragStart={onDragStart}
      >
        <Wrapper>
        <Title>Drag and Drop Board</Title>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(magic) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {boards.map((boardId, index) => (
                <Board
                  boardId={boardId}
                  todos={todos[boardId]}
                  index={index}
                  key={index}
                />
              ))}
              {magic.placeholder}
            </Boards>
          )}
        </Droppable>
        <TrashCan />
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
