import React from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";

const TeamWrapper = Styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background-color: #362234;
  color: #958993;
`;

const TeamList = Styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = Styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover{
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const team = ({ id, name }) => (
  <Link key={`link-team-${id}`} to={"/view-team/" + id}>
    <TeamListItem key={`team-${id}`}>{name}</TeamListItem>
  </Link>
);

export default ({ teams }) => (
  <TeamWrapper>
    <TeamList>{teams.map(team)}</TeamList>
  </TeamWrapper>
);
