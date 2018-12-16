import React from "react";
import Styled from "styled-components";
import { Input } from "semantic-ui-react";
import { withFormik } from "formik";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";

const SendMessageWrapper = Styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const SendMessage = ({
  channelName,
  channelId,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <SendMessageWrapper>
    <Input
      name={"message"}
      value={values.message}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={e => {
        if (e.keyCode === 13)
          //Enter_ket
          handleSubmit(e);
      }}
      disabled={isSubmitting}
      fluid
      placeholder={"message # " + channelName}
    />
  </SendMessageWrapper>
);

const createMessageMutation = gql`
  mutation($channelId: Int!, $message: String!) {
    createMessage(channelId: $channelId, message: $message)
  }
`;

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: "" }),
    handleSubmit: async (
      { message },
      { props: { channelId, mutate }, setSubmitting, resetForm }
    ) => {
      if (!message || !message.trim()) {
        setSubmitting(false);
        return;
      }

      await mutate({
        variables: { channelId, message }
      });
      setSubmitting(false);
      resetForm(false);
    }
  })
)(SendMessage);
