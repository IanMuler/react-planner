import styled from "styled-components";

export const Todos = styled.ul`
  width: 100%;
  height: fits-content;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

export const NoItems = styled.div`
  text-align: center;
  padding: 0.5rem;
  margin: 10px;
  color: #999;

  span {
    text-align: center;
    overflow-wrap: break-word;
  }
`;
