import React from "react";
import SideBar from "../containers/sideBar";
import SendMessage from "../components/sendMessage";
import Header from "../components/header";
import AppLayout from "../components/appLayout";
import { graphql } from "react-apollo";
import { allTeamsQuery } from "../graphql/team";
import findIndex from "lodash/findIndex";
import { Redirect } from "react-router-dom";
import MessageContainer from "../containers/messageContainer";

const ViewTeam = ({
  data: { loading, allTeams, invitedTeams },
  match: {
    params: { teamId, channelId }
  }
}) => {
  if (loading) return null;
  const teams = [...allTeams, ...invitedTeams];
  if (!teams.length) {
    return <Redirect to={"/create-team"} />;
  }
  const teamIdInteger = parseInt(teamId, 10);
  const channelIdInteger = parseInt(channelId, 10);

  const teamIdx = !!teamIdInteger ? findIndex(teams, ["id", teamIdInteger]) : 0;
  const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

  const channelIdx = !!channelId
    ? findIndex(team.channels, ["id", channelIdInteger])
    : 0;
  const channel =
    channelIdx === -1 ? team.channels[0] : team.channels[channelIdx];

  return (
    <AppLayout>
      <SideBar
        teams={teams.map(t => ({
          id: t.id,
          name: t.name.charAt(0).toUpperCase()
        }))}
        team={team}
        teamIdx={teamIdx}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && <MessageContainer channelId={channel.id} />}
      {channel && (
        <SendMessage channelName={channel.name} channelId={channel.id} />
      )}
    </AppLayout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
