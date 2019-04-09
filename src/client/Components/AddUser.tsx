import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class AddUser extends React.Component<
  IAddUserProps,
  IAddUserState
> {
  constructor(props: IAddUserProps) {
    super(props);

    this.state = {};
  }

  render() {
    return <></>;
  }
}

interface IAddUserProps {}

interface IAddUserState {}
