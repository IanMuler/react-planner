import styled from "styled-components";
import {
  Create,
  CheckCircleOutline,
  Add,
  Delete,
} from "@styled-icons/material-sharp";

export const Tasks = styled.ul`
  width: 250px;
  list-style: none;
  margin: 0 0 auto 20px;
  transition: all 0.2s ease-in-out;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
`;

export const CreateTask = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  margin-right: 20px;
  color: #000;
  cursor: pointer;
`;
export const CreateIcon = styled(Add)`
  width: 25px;
  height: 25px;
`;

export const CreateTaskItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 85%;
  text-align: center;
  padding: 0.5rem;
  margin: 10px 0;
  background-color: #f0eeeb;
  border-radius: 10px;
  position: relative;
  user-select: none;
`;

export const CreateTaskInput = styled.input`
  font-size: inherit;
  background-color: transparent;
  border: none;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export const CreateTaskItemDuration = styled.select`
  width: auto;
  text-align: center;
  padding: 5px;
  background-color: transparent;
  border: none;
`;

export const ConfirmTask = styled(CheckCircleOutline)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: -30px;
  width: 30px;
  height: 30px;
  margin: auto;
  color: #6cd66cb0;
`;
