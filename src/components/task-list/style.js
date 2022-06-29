import styled from "styled-components";
import { up } from "styled-breakpoints";
import { CheckCircleOutline, Add } from "@styled-icons/material-sharp";
import { theme } from "../../theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${up("md")} {
    width: 30%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2rem;
`;

export const Title = styled.h2`
  font-size: ${theme.font.size.sm.category};
`;

export const CreateTask = styled.button`
  width: 45px;
  height: 45px;
  padding: 0.5rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  ${up("md")} {
    width: 35px;
    height: 35px;
  }
`;

export const CreateIcon = styled(Add)``;

export const CreateTaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  * {
    font-size: ${theme.font.size.sm.task};
  }

  ${up("md")} {
    * {
      font-size: ${theme.font.size.xl.task};
    }
  }
`;

export const CreateTaskItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 1rem;
  width: 80%;
  background-color: #f0eeeb;
  border-radius: 10px;

  ${up("md")} {
    padding: 0.6rem 1rem;
`;

export const CreateTaskInput = styled.input`
  background-color: transparent;
  border: none;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

export const CreateTaskItemDuration = styled.select`
  text-align: center;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
`;

export const ConfirmTask = styled(CheckCircleOutline)`
  width: 50px;
  height: 50px;
  margin: auto;
  color: #6cd66cb0;

  ${up("md")} {
    width: 35px;
    height: 35px;
  }
`;

export const Tasks = styled.ul`
  list-style: none;
`;
