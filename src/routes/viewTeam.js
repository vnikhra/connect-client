import React from "react";
import Channels from "../components/channels";
import Teams from "../components/teams";
import Messages from "../components/messages";
import SendMessage from "../components/sendMessage";
import Header from "../components/header";
import AppLayout from "../components/appLayout";

export default () => (
  <AppLayout>
    <Teams
      teams={[
        {
          id: 1,
          name: "T"
        },
        {
          id: 2,
          name: "A"
        }
      ]}
    />
    <Channels
      teamname={"Team Name"}
      username={"User Name"}
      channels={[{ id: 1, name: "general" }, { id: 1, name: "general" }]}
      users={[
        {
          id: 1,
          name: "slackbot"
        },
        {
          id: 2,
          name: "user1"
        }
      ]}
    />
    <Header channelName={"general"}/>
    <Messages>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <SendMessage channelName={"general"}/>
  </AppLayout>
);
