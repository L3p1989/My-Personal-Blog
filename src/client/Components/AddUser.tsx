import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

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
    let authors = await a.json();
    this.setState({ authors });
    console.log(authors);
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
  authors: Array<{
    email: string;
  }>;
}
