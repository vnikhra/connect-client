import React from "react";
import Messages from "../components/messages";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Comment } from "semantic-ui-react";

const messageContainer = ({ data: { loading, messages } }) => {
  if (loading) return null;
  return (
    <Messages>
      <Comment.Group>
        {messages.map(message => (
          <Comment key={"message-" + message.id}>
            <Comment.Content>
              <Comment.Author as={"a"}>{message.user.username}</Comment.Author>
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
};

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

export default graphql(messagesQuery, {
  variables: ({ channelId }) => ({
    channelId
  })
})(messageContainer);
