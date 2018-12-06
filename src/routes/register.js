import React from "react";
import { Container, Input, Header, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async () => {
    console.log(
      await this.props.mutate({
        variables: this.state
      })
    );
  };

  render() {
    return (
      <Container text>
        <Header as={"h2"}>Register</Header>
        <Input
          name={"username"}
          onChange={this.onChange}
          placeholder={"username"}
          fluid
        />
        <Input
          name={"email"}
          onChange={this.onChange}
          placeholder={"email"}
          fluid
        />
        <Input
          name={"password"}
          onChange={this.onChange}
          type={"password"}
          placeholder={"password"}
          fluid
        />
        <Button onClick={this.onSubmit}> Submit </Button>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
