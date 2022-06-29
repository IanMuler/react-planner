import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../theme";
import { Delete } from "@styled-icons/material-sharp";
import { Context } from "../../context/state";
import { Droppable, Draggable } from "react-beautiful-dnd";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.gradient};
  opacity: ${(props) => (props.isDragging ? 0.6 : 0)};
  z-index: ${(props) => (props.isDragging ? 1 : -1)};
  transition: all 0.3s ease-in-out;
`;

const Icon = styled(Delete)`
  position: fixed;
  width: 50px;
  height: 50px;
  color: ${theme.colors.white};
`;

const DeleteIcon = ({ isDragging }) => {
  const iconRef = React.createRef();

  return (
    <Droppable droppableId="delete">
      {(provided) => (
        <Container ref={provided.innerRef} isDragging={isDragging}>
          {isDragging && <Icon ref={iconRef} />}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

export default DeleteIcon;
