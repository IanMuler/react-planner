import styled from "styled-components";
import { Create, CheckCircleOutline } from "@styled-icons/material-sharp";

export const Application = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Header = styled.h1`
  margin: 10px;
`;

export const Container = styled.div`
  padding: 20px;
  display: flex;
`;

export const TimeWakeUp = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Todos = styled.ul`
  min-width: 300px;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

export const TodosItem = styled.li`
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  margin: 10px;
`;

export const TodosItemDuration = styled.span`
  float: right;
  width: 50px;
  text-align: center;
`;

export const TodosItemStart = styled.span`
  float: left;
  width: 50px;
  text-align: center;
`;

export const Tasks = styled.ul`
  width: 300px;
  list-style: none;
  margin: auto 0 0 10px;
  transition: all 0.2s ease-in-out;
`;

export const TaskItem = styled.li`
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  margin: 10px 0;
  background-color: ${props => (props.isCreating ? "#f0eeeb" : "#e6e4e1")};
  border-radius: 10px;
  position: relative;
`;

export const CreateTask = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px;
  margin: 10px 0 10px auto;
  background-color: #e6e4e1;
  color: #000;
  cursor: pointer;

  span {
    white-space: nowrap;
    font-weight: bold;
    margin-left: 10px;
  }
`;

export const CreateIcon = styled(Create)`
  width: 20px;
  height: 20px;
`;

export const CreateTaskItem = styled.input`
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
  right: -40px;
  width: 30px;
  height: 30px;
  margin: auto;
  color: #6cd66cb0;
`;