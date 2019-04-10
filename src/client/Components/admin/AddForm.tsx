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
      title: null,
      content: null,
      authors: [],
      saveStatus: null
    };
  }

  private alert: JSX.Element = null;
  private saving: boolean = false;

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
    if (this.saving) return;
    let newBlog: { authorid: number; title: string; content: string } = {
      authorid: User.userid,
      title: this.state.title,
      content: this.state.content
    };
    try {
      this.saving = true;
      let result = await json("api/blogs", "POST", newBlog);
      if (result) {
        this.setState({
          title: null,
          content: null,
          saveStatus: "success"
        });
        this.props.history.replace("/admin/blogs");
      } else {
        this.setState({ saveStatus: "error" });
      }
    } catch (e) {
      this.setState({ saveStatus: "error" });
      throw e;
    } finally {
      this.saving = false;
    }
  }

  render() {
    if (this.state.saveStatus === "success") {
      this.alert = (
        <div className="alert alert-success p-1 m-3" role="alert">
          Blog Added!
        </div>
      );
    } else if (this.state.saveStatus === "error") {
      this.alert = (
        <div className="alert alert-danger p-1 m-3" role="alert">
          There was an issue with your blog post!
        </div>
      );
    }

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
            {this.alert}
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
  saveStatus: string;
}
