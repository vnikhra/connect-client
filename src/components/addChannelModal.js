import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import { withFormik } from "formik";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";

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
    createChannel(teamId: $teamId, name: $name)
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: "" }),
    handleSubmit: async (
      values,
      { props: { teamId, mutate }, setSubmitting }
    ) => {
      const response = await mutate({
        variables: { teamId, name: values.name }
      });
      console.log(response);
      setSubmitting(false);
    }
  })
)(AddChannelModal);
