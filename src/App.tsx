import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { RecoilState, useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import { Board } from "./Components/Board";
import DraggableCard from "./Components/DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;



function App() {
  const [todos, setTodos] =useRecoilState(todoState)
  const onDragEnd = (info:DropResult) => {
    console.log('info?',info)
    const { destination, draggableId, source } = info; 
    if(destination?.droppableId === source.droppableId){
      //check the same board movement
      setTodos(allBoards=>{
        const boardCopy = [...allBoards[source.droppableId]]
        //remove items on source.index
        boardCopy.splice(source.index, 1)
        //put back the items on the destination.index
        boardCopy.splice(destination?.index, 0, draggableId)
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        }
      })

    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(todos).map((boardId) => (
              <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
