import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { RecoilState, useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 470px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeact(1, 1fr);
`;
const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;



function App() {
  const [todos, setTodos] =useRecoilState(todoState)
  const onDragEnd = ({draggableId, destination, source}:DropResult) => {
    if(!destination) return ;
    setTodos(oldTodos=>{
      const copyTodos = [...oldTodos]
      //remove items on source.index
      console.log('delete what?', source.index)
      console.log('copy array', copyTodos)
      copyTodos.splice(source.index, 1)
      //put back the items on the destination.index
      copyTodos.splice(destination?.index, 0, draggableId)
      return copyTodos
    })
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(provided) => (
                <Board ref={provided.innerRef} {...provided.droppableProps}>
                  {todos.map((value, index) => (
                    <DraggableCard key={value} index={index} value={value}/>
                  ))}
                  {provided.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
