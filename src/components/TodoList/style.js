import styled from "styled-components";

export const Todos = styled.ul`
  height: 100%;
  min-width: 300px;
  max-width: 40%;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

export const TodosItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 0.5rem;
  margin: 10px;
`;

export const TodosItemDuration = styled.span`
  width: 50px;
  text-align: center;
`;

export const TodosItemStart = styled.span`
  width: 50px;
  text-align: center;
`;

export const TodosText = styled.span`
  width: calc(100% - 100px);
  text-align: center;
  overflow-wrap: break-word;
`;
