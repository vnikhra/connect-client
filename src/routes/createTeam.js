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
      errors: {}
    });
  }

  onChange = e => {
    this[e.target.name] = e.target.value;
    this.errors = {};
  };

  onSubmit = async () => {
    const { name } = this;
    let response = null;

    try {
      response = await this.props.mutate({
        variables: { name }
      });
    } catch (err) {
      this.props.history.push("/login");
      return;
    }

    console.log(response);
    const { ok, team, errors } = response.data.createTeam;
    if (ok) {
      this.props.history.push("/view-team/" + team.id);
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        if (`${path}Error` in err) {
          err[`${path}Error`].push(message);
        }else{
          err[`${path}Error`] = message;
        }
      });
      this.errors = err;
    }
  };
  render() {
    const {
      name,
      errors: { nameError }
    } = this;
    const errorList = [];
    if (nameError) {
      errorList.push(nameError);
    }
    return (
      <Container text>
        <Header as={"h2"}>Create Team</Header>
        <Form>
          <Form.Field error={nameError && nameError.length > 0}>
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
        {errorList.length ? (
          <Message
            error
            header="There were some errors while creating team"
            list={errorList}
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
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
