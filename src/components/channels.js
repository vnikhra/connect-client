import React from "react";
import Styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ChannelWrapper = Styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #4e3a4c;
  color: #958993;
`;

const paddingLeft = "padding-left: 10px";

const TeamNameHeader = Styled.h1`
  color: #fff;
  font-size: 20px;
`;

const PushLeft = Styled.div`${paddingLeft}`;

const SideBarList = Styled.ul`
   width: 100%;
   list-style: none;
   padding-left: 0px;
`;

const SideBarListElement = Styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = Styled.li`
  ${paddingLeft}
`;

const Green = Styled.span`color: #38978d`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : "○");

const channel = ({ id, name }, teamId) => (
  <Link key={`link-channel-${id}`} to={"/view-team/" + teamId + "/" + id}>
    <SideBarListElement key={`channel-${id}`}># {name}</SideBarListElement>
  </Link>
);

const user = ({ id, name }) => (
  <SideBarListElement key={`user-${id}`}>
    <Bubble />
    {" " + name}
  </SideBarListElement>
);

export default ({
  teamname,
  username,
  channels,
  users,
  onAddChannelClick,
  teamId
}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamname}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels
          <Icon name={"add circle"} onClick={onAddChannelClick} />
        </SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
  </ChannelWrapper>
);
