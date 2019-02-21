import * as React from "react";

export default class HomePage extends React.Component<
  IHomePageProps,
  IHomePageState
> {
  constructor(props: IHomePageProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container hp-container">
        <h1>My Personal blogs</h1>
        <h3>Slithr is the place I like to post my blogs.</h3>
        <p>Thanks for stopping by!</p>
      </div>
    );
  }
}

interface IHomePageProps {}

interface IHomePageState {}
