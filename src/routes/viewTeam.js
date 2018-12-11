import React from "react";
import SideBar from "../containers/sideBar"
import Messages from "../components/messages";
import SendMessage from "../components/sendMessage";
import Header from "../components/header";
import AppLayout from "../components/appLayout";

export default ({ match: {params}}) => (
  <AppLayout>
    <SideBar currentTeam={params.teamId}/>
    <Header channelName={"general"} />
    <Messages>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName={"general"} />
  </AppLayout>
);
