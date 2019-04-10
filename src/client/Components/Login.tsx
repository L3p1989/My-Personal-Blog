import * as React from "react";

export default class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  async loginSubmit() {
    event.preventDefault();
    let userLogin = {
      email: this.state.email,
      password: this.state.email
    };
    try {
    } catch (e) {}
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
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                className="form-control"
                placeholder="User password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            <button className="btn my-btn" onClick={() => this.loginSubmit()}>
              Submit
            </button>
            <button className="btn my-btn">Cancel</button>
          </form>
        </div>
      </>
    );
  }
}

interface ILoginProps {}

interface ILoginState {
  email: string;
  password: string;
}
