import React from "react";
import SideBar from "../containers/sideBar";
import Messages from "../components/messages";
import SendMessage from "../components/sendMessage";
import Header from "../components/header";
import AppLayout from "../components/appLayout";
import { graphql } from "react-apollo";
import { allTeamsQuery } from "../graphql/team";
import findIndex from "lodash/findIndex";

const ViewTeam = ({
  data: { loading, allTeams },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) return null;
  const teamIdx = !!teamId
    ? findIndex(allTeams, ["id", parseInt(teamId, 10)])
    : 0;
  const team = allTeams[teamIdx];

  const channelIdx = !!channelId
    ? findIndex(team.channels, ["id", parseInt(channelId, 10)])
    : 0;
  const channel = team.channels[channelIdx];

  return (
    <AppLayout>
      <SideBar
        teams={allTeams.map(t => ({
          id: t.id,
          name: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
        teamIdx={teamIdx}
      />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id}>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
