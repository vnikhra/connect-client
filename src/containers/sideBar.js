import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Teams from "../components/teams";
import Channels from "../components/channels";
import _ from "lodash";
import decode from "jwt-decode";

const SideBar = ({ data: { loading, allTeams }, currentTeam }) => {
  if (loading) return null;

  const teamIdx = _.findIndex(allTeams, ["id", currentTeam]);
  const team = allTeams[teamIdx];
  let username = "";
  try {
    const token = localStorage.getItem("token");
    const { user } = decode(token);
    username = user.username;
  } catch (err) {}

  return [
    <Teams
      key={"Teams"}
      teams={allTeams.map(t => ({
        id: t.id,
        name: t.name.charAt(0).toUpperCase()
      }))}
    />,
    <Channels
      key={"Channels"}
      teamname={team.name}
      username={username}
      channels={team.channels}
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
  ];
};

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(SideBar);
