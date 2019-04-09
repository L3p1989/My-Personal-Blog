import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../scss/app";

import NavBar from "./NavBar";
import HomePage from "./HomePage";
import BlogsPage from "./BlogsPage";
import BlogPage from "./BlogPage";
import AddForm from "./AddForm";
import AddUser from "./AddUser";
import Login from "./Login";

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="background">
        <Router>
          <>
            <NavBar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/blogs" component={BlogsPage} />
              <Route path="/blogs/:id" component={BlogPage} />
              <Route path="/new-blog" component={AddForm} />
              <Route path="/register" component={AddUser} />
              <Route path="/login" component={Login} />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

interface IAppProps {}

interface IAppState {}
