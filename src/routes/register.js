import React from "react";
import { Container, Input, Header, Button, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Register extends React.Component {
  state = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: ""
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      [`${name}Error`]: ""
    });
  };

  onSubmit = async () => {
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });
    console.log(response);
    const { ok, errors } = response.data.register;
    if (ok) {
      this.props.history.push("/");
    } else {
      const err = {};
      console.log(errors);
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };

  render() {
    const {
      username,
      usernameError,
      email,
      emailError,
      password,
      passwordError
    } = this.state;
    return (
      <Container text>
        <Header as={"h2"}>Register</Header>
        <Input
          error={!!usernameError}
          name={"username"}
          onChange={this.onChange}
          placeholder={"username"}
          fluid
          value={username}
        />
        <Input
          error={!!emailError}
          name={"email"}
          onChange={this.onChange}
          placeholder={"email"}
          fluid
          value={email}
        />
        <Input
          error={!!passwordError}
          name={"password"}
          onChange={this.onChange}
          type={"password"}
          placeholder={"password"}
          fluid
          value={password}
        />
        <Button onClick={this.onSubmit}> Submit </Button>
          {usernameError || emailError || passwordError ? (
              <Message
              error
              header = "There was some errors with your submission"
              list={[
                  usernameError ? usernameError : null,
                  emailError ? emailError : null,
                  passwordError ? passwordError : null
              ]}/>
          ): null}
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
