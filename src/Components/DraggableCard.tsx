import { Draggable } from '@hello-pangea/dnd'
import styled from 'styled-components';
const Card = styled.div`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
`;

interface IDraggableCardProps {
    value: string;
    index: number;
}

export default function DraggableCard({value, index}:IDraggableCardProps) {
  return (
    <Draggable draggableId={value} index={index} key={value}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {value}
                        </Card>
                      )}
                    </Draggable>
  )
}
