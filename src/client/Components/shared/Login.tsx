import * as React from "react";
import { json, SetAccessToken, User } from "../../utils/api";
import { RouteComponentProps } from "react-router-dom";

export default class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginStatus: false
    };
  }

  private alert: JSX.Element = null;
  private loggingIn: boolean = false;

  componentDidMount() {
    if (User && User.role === "admin") {
      this.props.history.replace("/admin/blogs");
    }
    if (User && User.role === "guest") {
      this.props.history.replace("/blogs");
    }
  }

  async loginSubmit() {
    event.preventDefault();

    this.setState({ loginStatus: false });
    if (this.loggingIn) return;

    try {
      this.loggingIn = true;
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
        this.setState({ loginStatus: true });
      }
    } catch (e) {
      this.setState({ loginStatus: true });
      throw e;
    } finally {
      this.loggingIn = false;
    }
  }

  render() {
    if (this.state.loginStatus) {
      this.alert = (
        <div className="alert alert-danger p-1 m-3" role="alert">
          Invalid login!
        </div>
      );
    }

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
            {this.alert}
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
  loginStatus: boolean;
}
