import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../scss/app";

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Router>
          <>
            <Switch />
          </>
        </Router>
      </>
    );
  }
}

interface IAppProps {}

interface IAppState {}
