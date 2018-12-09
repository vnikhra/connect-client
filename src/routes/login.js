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

class Login extends React.Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: "",
      password: "",
      errors: []
    });
  }

  onChange = e => {
    this[e.target.name] = e.target.value;
    this.errors = [];
  };

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password }
    });
    console.log(response);
    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
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
    const { email, password, errors } = this;
    return (
      <Container text>
        <Header as={"h2"}>Login</Header>
        <Form>
          <Form.Field error={this.errors.length > 0}>
            <Input
              name={"email"}
              onChange={this.onChange}
              placeholder={"email"}
              fluid
              value={email}
            />
          </Form.Field>
          <Form.Field error={this.errors.length > 0}>
            <Input
              name={"password"}
              onChange={this.onChange}
              type={"password"}
              placeholder={"password"}
              fluid
              value={password}
            />
          </Form.Field>
          <Button onClick={this.onSubmit}> Submit </Button>
        </Form>
        {this.errors.length > 0 ? (
          <Message
            error
            header="There were some errors while logging in"
            list={errors}
          />
        ) : null}
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
