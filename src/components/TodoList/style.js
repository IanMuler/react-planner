import styled from "styled-components";

export const Todos = styled.ul`
  height: 100%;
  min-width: 300px;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

export const TodosItem = styled.li`
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
