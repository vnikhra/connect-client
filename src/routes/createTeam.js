import React from "react";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
import {
  Form,
  Button,
  Container,
  Header,
  Input,
  Message
} from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      name: "",
      errors: []
    });
  }

  onChange = e => {
    this[e.target.name] = e.target.value;
    this.errors = [];
  };

  onSubmit = async () => {
    const { name } = this;
    const response = await this.props.mutate({
      variables: { name }
    });
    console.log(response);
    const { ok, errors } = response.data.createTeam;
    if (ok) {
      this.props.history.push("/");
    } else {
      const err = [];
      errors.forEach(({ path, message }) => {
        err.push(message);
      });
      this.errors = err;
    }
  };
  render() {
    const { name, errors } = this;
    return (
      <Container text>
        <Header as={"h2"}>Create Team</Header>
        <Form>
          <Form.Field error={this.errors.length > 0}>
            <Input
              name={"name"}
              onChange={this.onChange}
              placeholder={"Team Name"}
              fluid
              value={name}
            />
          </Form.Field>
          <Button onClick={this.onSubmit}> Submit </Button>
        </Form>
        {this.errors.length > 0 ? (
          <Message
            error
            header="There were some errors while creating team"
            list={errors}
          />
        ) : null}
      </Container>
    );
  }
}

const createTeamMutation = gql`
    mutation($name: String!) {
        createTeam(name: $name) {
            ok
            errors {
                path
                message
            }
        }
    }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
