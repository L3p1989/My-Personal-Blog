import * as React from "react";
import { json } from "../../utils/api";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

export default class AddUser extends React.Component<
  IAddUserProps,
  IAddUserState
> {
  constructor(props: IAddUserProps) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
      authors: [],
      passwordMatch: true
    };
  }

  private alert: JSX.Element = null;
  private addingUser: boolean = false;

  async handleAdd() {
    event.preventDefault();
    if (this.addingUser) return;
    if (
      this.state.password === this.state.confirmPass &&
      this.state.password !== ""
    ) {
      this.setState({ passwordMatch: true });
      let newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };
      try {
        this.addingUser = true;
        let result = await json("/auth/register", "POST", newUser);
        if (result) {
          this.setState({
            name: null,
            email: null,
            password: null,
            confirmPass: null
          });
          this.props.history.replace("/login");
        } else {
          //error
        }
      } catch (e) {
        throw e;
      } finally {
        this.addingUser = false;
      }
    } else {
      this.setState({ passwordMatch: false });
    }
  }

  async componentDidMount() {
    let a = await fetch("/api/authors");
    let users = await a.json();
    let authors: any = [];
    users.forEach((author: any) => {
      authors.push(author.email);
    });
    this.setState({ authors });
  }

  render() {
    if (this.state.passwordMatch === false) {
      this.alert = (
        <div className="alert alert-danger p-1 m-3" role="alert">
          Passwords do not match or are blank!
        </div>
      );
    }
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              onChange={e =>
                this.setState({
                  name: e.target.value
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Email"
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Make a password"
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Confirm password"
              onChange={e => {
                this.setState({
                  confirmPass: e.target.value
                });
              }}
            />
          </div>
          <button className="btn my-btn" onClick={() => this.handleAdd()}>
            Submit
          </button>
          <Link to="/" className="btn my-btn">
            Cancel
          </Link>
          {this.alert}
        </form>
      </div>
    );
  }
}

interface IAddUserProps extends RouteComponentProps<{}> {}

interface IAddUserState {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
  authors: Array<{}>;
  passwordMatch: boolean;
}
