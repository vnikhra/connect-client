import React from 'react'
import Styled from "styled-components";
import {Header} from "semantic-ui-react";

const HeaderWrapper =  Styled.div`
  grid-column: 3;
  grid-row: 1;
`;

export default ({channelName}) => (
  <HeaderWrapper>
    <Header textAlign={"center"}># {channelName}</Header>
  </HeaderWrapper>
)
