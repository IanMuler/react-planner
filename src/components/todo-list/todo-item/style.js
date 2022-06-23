import styled from "styled-components";

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 0.5rem;
  margin: 10px;
`;

export const Duration = styled.span`
  width: 50px;
  text-align: center;
`;

export const Start = styled.span`
  width: 50px;
  text-align: center;
`;

export const Text = styled.span`
  width: calc(100% - 100px);
  text-align: center;
  overflow-wrap: break-word;
`;
