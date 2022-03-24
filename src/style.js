import styled from "styled-components";
import { Refresh } from "@styled-icons/material-sharp";

export const Application = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Header = styled.h1`
  margin: 10px;
`;

export const Container = styled.div`
  margin: 40px 40px 0 40px;
`;

export const TimeWakeUp = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const RefreshIcon = styled(Refresh)`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  cursor: pointer;
`;
