import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../scss/app";

import NavBar from "./NavBar";

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
            <NavBar />
            <Switch>
              <Route exact path="/" />
              <Route exact path="/blogs" />
              <Route path="/blogs/:id" />
            </Switch>
          </>
        </Router>
      </>
    );
  }
}

interface IAppProps {}

interface IAppState {}
