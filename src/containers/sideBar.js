import React from "react";
import Teams from "../components/teams";
import Channels from "../components/channels";
import decode from "jwt-decode";
import AddChannelModal from "../components/addChannelModal";
import InvitePeopleModal from "../components/invitePeopleModal";

export default class SideBar extends React.Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false
  };

  handleChannelClick = e => {
    if (e) e.preventDefault();
    this.setState({ openAddChannelModal: !this.state.openAddChannelModal });
  };

  handleInvitePeopleClick = e => {
    if (e) e.preventDefault();
    this.setState({ openInvitePeopleModal: !this.state.openInvitePeopleModal });
  };

  render() {
    const { openAddChannelModal, openInvitePeopleModal } = this.state;
    const { teams, team, teamIdx } = this.props;
    let username = "";
    let isOwner = false;
    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
      isOwner = team.owner === user.id;
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
        onInvitePeople={this.handleInvitePeopleClick}
        isOwner={isOwner}
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
        open={openAddChannelModal}
        onClose={this.handleChannelClick}
      />,
      <InvitePeopleModal
        key={"invite-people-model"}
        teamIdx={teamIdx}
        team={parseInt(team.id, 10)}
        open={openInvitePeopleModal}
        onClose={this.handleInvitePeopleClick}
      />
    ];
  }
}
