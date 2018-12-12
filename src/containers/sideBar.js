import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Teams from "../components/teams";
import Channels from "../components/channels";
import findIndex from "lodash/findIndex";
import decode from "jwt-decode";
import AddChannelModal from "../components/addChannelModal";

class SideBar extends React.Component {
  state = {
    openAddChannelModal: false
  };

  handleChannelClick = () => {
    this.setState({ openAddChannelModal: !this.state.openAddChannelModal });
  };

  render() {
    const {
      data: { loading, allTeams },
      currentTeam
    } = this.props;
    if (loading) return null;
    const teamIdx = currentTeam
      ? findIndex(allTeams, ["id", parseInt(currentTeam, 10)])
      : 0;
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
        onAddChannelClick={this.handleChannelClick}
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
      />,
      <AddChannelModal
        key={"add-channel-model"}
        team={parseInt(currentTeam, 10)}
        open={this.state.openAddChannelModal}
        onClose={this.handleChannelClick}
      />
    ];
  }
}

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
