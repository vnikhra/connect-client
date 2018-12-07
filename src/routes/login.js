import React from "react";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
import { Button, Container, Header, Input } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class Login extends React.Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: "",
      password: ""
    });
  }

  onChange = e => (this[e.target.name] = e.target.value);

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });
    console.log(response);
    const { ok, token, refreshToken } = response.data.login;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    }
  };
  render() {
    const { email, password } = this;
    return (
      <Container text>
        <Header as={"h2"}>Login</Header>
        <Input
          name={"email"}
          onChange={this.onChange}
          placeholder={"email"}
          fluid
          value={email}
        />
        <Input
          name={"password"}
          onChange={this.onChange}
          type={"password"}
          placeholder={"password"}
          fluid
          value={password}
        />
        <Button onClick={this.onSubmit}> Submit </Button>
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
