import React from "react";
import Styled from "styled-components";
import { Input } from "semantic-ui-react";

const SendMessageWrapper = Styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

export default ({ channelName }) => (
  <SendMessageWrapper>
    <Input fluid placeholder={"message # " + channelName} />
  </SendMessageWrapper>
);
