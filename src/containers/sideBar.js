import React from "react";
import Teams from "../components/teams";
import Channels from "../components/channels";
import decode from "jwt-decode";
import AddChannelModal from "../components/addChannelModal";

export default class SideBar extends React.Component {
  state = {
    openAddChannelModal: false
  };

  handleChannelClick = () => {
    this.setState({ openAddChannelModal: !this.state.openAddChannelModal });
  };

  render() {
    const { teams, team, teamIdx } = this.props;
    let username = "";
    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
    } catch (err) {}

    return [
      <Teams key={"Teams"} teams={teams} />,
      <Channels
        key={"Channels"}
        teamname={team.name}
        username={username}
        teamId={team.id}
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
        teamIdx={teamIdx}
        team={parseInt(team.id, 10)}
        open={this.state.openAddChannelModal}
        onClose={this.handleChannelClick}
      />
    ];
  }
}
