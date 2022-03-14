import styled from 'styled-components'
import { Create, CheckCircleOutline } from '@styled-icons/material-sharp'

export const Tasks = styled.ul`
  width: 300px;
  list-style: none;
  margin: auto 0 0 20px;
  transition: all 0.2s ease-in-out;
`

export const Title = styled.h2`
  font-size: 1.5rem;
`

export const CreateTask = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px;
  background-color: #e6e4e1;
  color: #000;
  cursor: pointer;

  span {
    white-space: nowrap;
    font-weight: bold;
    margin-left: 10px;
  }
`
export const CreateIcon = styled(Create)`
  width: 20px;
  height: 20px;
`

export const CreateTaskItem = styled.li`
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  margin: 10px 0;
  background-color: #f0eeeb;
  border-radius: 10px;
  position: relative;
  user-select: none;
`

export const CreateTaskInput = styled.input`
  font-size: inherit;
  background-color: transparent;
  border: none;
  text-align: center;

  &:focus {
    outline: none;
  }
`

export const CreateTaskItemDuration = styled.select`
  width: auto;
  text-align: center;
  padding: 5px;
  background-color: transparent;
  border: none;
`

export const ConfirmTask = styled(CheckCircleOutline)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: -40px;
  width: 30px;
  height: 30px;
  margin: auto;
  color: #6cd66cb0;
`

export const TaskItem = styled.li`
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  margin: 10px 0;
  background-color: ${(props) => (props.assigned ? '#cccccc' : '#e6e4e1')};
  color: ${(props) => (props.assigned ? '#ababab' : 'inherit')};
  border-radius: 10px;
  position: relative;
  user-select: none;
`

export const TaskItemDuration = styled.span`
  float: right;
  width: 50px;
  text-align: center;
`
