import * as React from "react";

export default class App extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="container">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="User email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="User password"
              />
            </div>
            <button className="btn my-btn">Submit</button>
            <button className="btn my-btn">Cancel</button>
          </form>
        </div>
      </>
    );
  }
}

interface ILoginProps {}

interface ILoginState {}
