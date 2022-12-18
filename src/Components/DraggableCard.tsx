import { Draggable } from '@hello-pangea/dnd'
import React from 'react';
import styled from 'styled-components';
const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? '#ff6b6b' : props.theme.cardColor};
  margin-bottom: 5px;
  box-shadow: ${props => props.isDragging ? '0px 2px 5px rgba(0,0,0,0.2)' : 'none'};
`;

interface IDraggableCardProps {
    value: string;
    index: number;
}

function DraggableCard({value, index}:IDraggableCardProps) {
  return (
    <Draggable draggableId={value} index={index} key={value}>
                      {(provided, info) => (
                        <Card
                        isDragging={info.isDragging}
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
export default React.memo(DraggableCard);