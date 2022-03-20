import styled from "styled-components";
import { Create, Delete } from "@styled-icons/material-sharp";

export const Item = styled.li`
  width: 100%;
  height: 40px;
  text-align: center;
  padding: 0.5rem;
  margin: 10px 0;
  background-color: ${(props) => (props.assigned ? "#cccccc" : "#e6e4e1")};
  color: ${(props) => (props.assigned ? "#ababab" : "inherit")};
  border-radius: 10px;
  position: relative;
  user-select: none;
  opacity: ${(props) => (props.moving ? 0.6 : 1)};
`;

export const ItemDuration = styled.span`
  float: right;
  width: 50px;
  text-align: center;
`;

export const Options = styled.button`
  float: right;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: #000000bd;
  background: transparent;
  cursor: pointer;
  gap: 5px;
`;

export const EditIcon = styled(Create)`
  height: 100%;
`;
export const DeleteIcon = styled(Delete)``;
