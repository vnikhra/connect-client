import React from "react";
import Messages from "../components/messages";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const messageContainer = ({ data: { loading, messages } }) => {
  if (loading) return null;
  console.log(messages);
  return (
    <Messages>
      {JSON.stringify(messages)}
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
