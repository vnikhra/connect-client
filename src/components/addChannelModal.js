import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import { withFormik } from "formik";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { allTeamsQuery } from "../graphql/team";

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"name"}
            fluid
            placeholder={"Channel Name"}
          />
        </Form.Field>
        <Form.Group width={"equal"}>
          <Button
            type={"submit"}
            disabled={isSubmitting}
            fluid
            primary
            onClick={handleSubmit}
          >
            Create Channel
          </Button>
          <Button disabled={isSubmitting} fluid secondary onClick={onClose}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: async (
      values,
      { props: { teamIdx, onClose, team, mutate }, setSubmitting }
    ) => {
      await mutate({
        variables: { teamId: team, name: values.name },
        optimisticResponse: {
          createChannel: {
            __typename: "Mutation",
            ok: true,
            channel: {
              __typename: "channel",
              id: -1,
              name: values.name
            }
          }
        },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          const data = store.readQuery({ query: allTeamsQuery });
          data.allTeams[teamIdx].channels.push(channel);
          store.writeQuery({ query: allTeamsQuery, data });
        }
      });
      onClose();
      setSubmitting(false);
    }
  })
)(AddChannelModal);
