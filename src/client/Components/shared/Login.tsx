import * as React from "react";
import { json, SetAccessToken } from "../../utils/api";
import { RouteComponentProps } from "react-router-dom";

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

    try {
      let userLogin = {
        email: this.state.email,
        password: this.state.password
      };
      let result = await json("/auth/login", "POST", userLogin);
      if (result) {
        SetAccessToken(result.token, {
          userid: result.userid,
          role: result.role
        });
        if (result.role === "admin") {
          this.props.history.push("/admin/blogs");
        } else {
          this.props.history.push("/blogs");
        }
      } else {
        //checking a login status
      }
    } catch (e) {
      throw e;
    }
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

interface ILoginProps extends RouteComponentProps<{}> {}

interface ILoginState {
  email: string;
  password: string;
}
