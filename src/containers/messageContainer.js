import React from "react";
import Messages from "../components/messages";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Comment } from "semantic-ui-react";

class messageContainer extends React.Component {
  componentWillMount() {
    this.unsubscribe = this.subscribeToChannel(this.props.channelId);
  }

  componentWillReceiveProps({ channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) this.unsubscribe();
      this.unsubscribe = this.subscribeToChannel(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  subscribeToChannel = channelId =>
    this.props.data.subscribeToMore({
      document: newChannelMessageSubsription,
      variables: {
        channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage]
        };
      }
    });

  render() {
    const {
      data: { loading, messages }
    } = this.props;
    if (loading) return null;
    return (
      <Messages>
        <Comment.Group>
          {messages.map(message => (
            <Comment key={"message-" + message.id}>
              <Comment.Content>
                <Comment.Author as={"a"}>
                  {message.user.username}
                </Comment.Author>
                <Comment.Metadata>
                  <div>
                    {new Date(parseInt(message.createdAt, 10)).toString()}
                  </div>
                </Comment.Metadata>
                <Comment.Text>{message.message}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    );
  }
}

const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      message
      user {
        username
      }
      createdAt
    }
  }
`;

const newChannelMessageSubsription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      message
      user {
        username
      }
      createdAt
    }
  }
`;

export default graphql(messagesQuery, {
  variables: ({ channelId }) => ({
    channelId
  }),
  options: {
    fetchPolicy: "network-only"
  }
})(messageContainer);
