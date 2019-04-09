import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class EditForm extends React.Component<
  IEditFormProps,
  IEditFormState
> {
  constructor(props: IEditFormProps) {
    super(props);

    this.state = {
      blog: {},
      authorid: 1,
      title: "",
      content: "",
      authors: []
    };
  }

  async handleEdit() {
    event.preventDefault();
    let newBlog = {
      authorid: this.state.authorid,
      title: this.state.title,
      content: this.state.content
    };
    await fetch(`/api/blogs/${this.props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBlog)
    });
    this.props.history.push(`/blogs`);
  }

  async componentWillMount() {
    let r = await fetch(`/api/blogs/${this.props.id}`);
    let blog = await r.json();
    let a = await fetch("/api/authors");
    let authors = await a.json();
    this.setState({ blog, authors });
    this.setState({ title: blog.title, content: blog.content });
  }

  render() {
    return (
      <>
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
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              className="form-control"
              rows={5}
              onChange={e =>
                this.setState({
                  content: e.target.value
                })
              }
              value={this.state.content}
            />
          </div>
          <Link
            to={`/api/blogs`}
            className="btn my-btn"
            onClick={() => this.handleEdit()}
          >
            Save
          </Link>
        </form>
      </>
    );
  }
}

interface IEditFormProps {
  id: string;
  history: any;
}

interface IEditFormState {
  blog: any;
  authorid: number;
  title: string;
  content: string;
  authors: Array<{
    id: string;
    name: string;
  }>;
}
