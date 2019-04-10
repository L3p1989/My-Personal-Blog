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
        <h3>Thanks for stopping by my Slithr page!</h3>
      </div>
    );
  }
}

interface IHomePageProps {}

interface IHomePageState {}
