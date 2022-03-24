import styled from "styled-components";
import { Create, Delete } from "@styled-icons/material-sharp";

export const Item = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
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
  width: 50px;
  text-align: center;
`;

export const ItemText = styled.span`
  width: calc(100% - 50px);
  text-align: center;
  overflow-wrap: break-word;
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
