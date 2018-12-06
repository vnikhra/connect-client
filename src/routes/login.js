import React from "react";
import { extendObservable } from "mobx";
import { observer } from "mobx-react";
import { Button, Container, Header, Input } from "semantic-ui-react";

export default observer(
  class Login extends React.Component {
    constructor(props) {
      super(props);
      extendObservable(this, {
        email: "",
        password: ""
      });
    }

    onChange = e => (this[e.target.name] = e.target.value);

    onSubmit = () => console.log(this.email, this.password);

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
);
