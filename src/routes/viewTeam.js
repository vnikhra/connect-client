import React from "react";
import SideBar from "../containers/sideBar";
import Messages from "../components/messages";
import SendMessage from "../components/sendMessage";
import Header from "../components/header";
import AppLayout from "../components/appLayout";
import { graphql } from "react-apollo";
import { allTeamsQuery } from "../graphql/team";
import findIndex from "lodash/findIndex";
import { Redirect } from "react-router-dom";

const ViewTeam = ({
  data: { loading, allTeams },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) return null;

  if (!allTeams.length) {
    return <Redirect to={"/create-team"} />;
  }
  const teamIdInteger =  parseInt(teamId, 10);
  const channelIdInteger =  parseInt(channelId, 10);

  const teamIdx = !!teamIdInteger
    ? findIndex(allTeams, ["id", teamIdInteger])
    : 0;
  const team = allTeams[teamIdx];

  const channelIdx = !!channelId
    ? findIndex(team.channels, ["id", channelIdInteger])
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
      {channel && <Header channelName={channel.name} />}
      {channel && <Messages channelId={channel.id}>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>}
      {channel && <SendMessage channelName={channel.name} />}
    </AppLayout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
