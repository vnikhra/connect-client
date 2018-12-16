import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import { withFormik } from "formik";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import normalizeErrors from "../utils/normalizeErrors";

const InvitePeopleModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Invite People</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"email"}
            fluid
            placeholder={"User's Email"}
          />
        </Form.Field>
        {touched.email && errors.email ? errors.email[0] : null}
        <Form.Group width={"equal"}>
          <Button
            type={"submit"}
            disabled={isSubmitting}
            fluid
            primary
            onClick={handleSubmit}
          >
            Add User
          </Button>
          <Button disabled={isSubmitting} fluid secondary onClick={onClose}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: () => ({ email: "" }),
    handleSubmit: async (
      values,
      { props: { onClose, team, mutate }, setSubmitting, setErrors }
    ) => {
      const response = await mutate({
        variables: { teamId: team, email: values.email }
      });
      const { ok, errors } = response.data.addTeamMember;
      if (ok) {
        console.log(response);
        onClose();
      } else {
        setErrors(normalizeErrors(errors));
      }
      setSubmitting(false);
    }
  })
)(InvitePeopleModal);
