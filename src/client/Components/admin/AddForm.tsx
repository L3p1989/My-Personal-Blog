import * as React from "react";
import { json, User } from "../../utils/api";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

export default class AddForm extends React.Component<
  IAddFormProps,
  IAddFormState
> {
  constructor(props: IAddFormProps) {
    super(props);

    this.state = {
      authorid: 0,
      title: "",
      content: "",
      authors: []
    };
  }

  async componentDidMount() {
    if (!User || User.userid === null || User.role !== "admin") {
      this.props.history.replace("/login");
    } else {
      try {
        let authors = await json("/api/authors");
        this.setState({ authors });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async handleAdd() {
    event.preventDefault();
    let newBlog: { authorid: number; title: string; content: string } = {
      authorid: User.userid,
      title: this.state.title,
      content: this.state.content
    };
    try {
      let result = await json("api/blogs", "POST", newBlog);
      this.props.history.replace("/admin/blogs");
    } catch (e) {
      throw e;
    }
  }

  render() {
    return (
      <>
        <div className="container addform-container">
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="What's the title of your blog?"
                onChange={e =>
                  this.setState({
                    title: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Body</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Write your blog here"
                onChange={e =>
                  this.setState({
                    content: e.target.value
                  })
                }
              />
            </div>
            <button className="btn my-btn" onClick={() => this.handleAdd()}>
              Hisss!
            </button>
            <Link to="/admin/blogs" className="btn my-btn">
              Cancel
            </Link>
          </form>
        </div>
      </>
    );
  }
}

interface IAddFormProps extends RouteComponentProps<{}> {
  history: any;
}

interface IAddFormState {
  authorid: number;
  title: string;
  content: string;
  authors: Array<{
    id: string;
    name: string;
  }>;
}
