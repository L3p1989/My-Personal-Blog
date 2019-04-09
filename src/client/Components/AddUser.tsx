import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { object } from "prop-types";

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
      authors: []
    };
  }

  async componentDidMount() {
    let a = await fetch("/api/authors");
    let users = await a.json();
    let authors = [];
    users.forEach(author => {
      authors.push(author.email);
    });
    this.setState({ authors });
    console.log(this.state.authors);
  }

  render() {
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
                if (e.target.value === this.state.password) {
                }
              }}
            />
          </div>
          <button className="btn my-btn">Submit</button>
          <Link to="/" className="btn my-btn">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

interface IAddUserProps {}

interface IAddUserState {
  name: string;
  email: string;
  password: string;
  authors: Array<[{ [index: number]: { email: string } }]>;
}
