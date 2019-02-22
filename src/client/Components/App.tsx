import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../scss/app";

import NavBar from "./NavBar";
import HomePage from "./HomePage";
import BlogsPage from "./BlogsPage";
import BlogPage from "./BlogPage";
import AddForm from "./AddForm";

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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/blogs" component={BlogsPage} />
              <Route path="/blogs/:id" component={BlogPage} />
              <Route path="/new-blog" component={AddForm} />
            </Switch>
          </>
        </Router>
      </>
    );
  }
}

interface IAppProps {}

interface IAppState {}
