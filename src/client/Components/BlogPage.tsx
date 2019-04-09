import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class BlogPage extends React.Component<IBlogProps, IBlogState> {
  constructor(props: IBlogProps) {
    super(props);

    this.state = {
      blog: {},
      authorid: 7,
      title: "",
      content: "",
      authors: [],
      isShowingEdit: false,
      isShowingDelete: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);

    this.toggleDelete = this.toggleDelete.bind(this);
  }

  toggleEdit() {
    this.setState(prevState => ({
      isShowingEdit: !prevState.isShowingEdit,
      isShowingDelete: false
    }));
  }

  toggleDelete() {
    this.setState(prevState => ({
      isShowingDelete: !prevState.isShowingDelete,
      isShowingEdit: false
    }));
  }

  async handleEdit() {
    event.preventDefault();
    let newBlog = {
      authorid: this.state.authorid,
      title: this.state.title,
      content: this.state.content
    };
    await fetch(`/api/blogs/${this.props.match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBlog)
    });
    this.props.history.push(`/blogs`);
  }

  async handleDelete() {
    event.preventDefault();
    await fetch(`/api/blogs/${this.props.match.params.id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.blog)
    });
    this.props.history.push("/blogs");
  }

  async componentDidMount() {
    let r = await fetch(`/api/blogs/${this.props.match.params.id}`);
    let blog = await r.json();
    let a = await fetch("/api/authors");
    let authors = await a.json();
    this.setState({ blog, authors });
    this.setState({ title: blog.title, content: blog.content });
  }

  render() {
    return (
      <>
        <div className="container blog-container">
          <h1 className="author-name">{this.state.blog.authorid}</h1>
          <h2 className="blog-title">{this.state.blog.title}</h2>
          <p className="blog-content">"{this.state.blog.content}"</p>
          <div>
            <button className="btn my-btn" onClick={this.toggleEdit}>
              Edit
            </button>
            <button className="btn my-btn" onClick={this.toggleDelete}>
              Delete
            </button>
            <div
              className="container edit-container background rounded"
              style={{ display: this.state.isShowingEdit ? "inherit" : "none" }}
            >
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
                <button
                  className="btn my-btn"
                  onClick={e => {
                    event.preventDefault();
                    this.toggleEdit();
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
            <div
              style={{
                display: this.state.isShowingDelete ? "inherit" : "none"
              }}
              className="delete-confirm background"
            >
              <p>Are you sure you want to delete this blog?</p>
              <button
                className="btn my-btn"
                onClick={() => this.handleDelete()}
              >
                Yes
              </button>
              <button className="btn my-btn" onClick={this.toggleDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

interface IBlogProps extends RouteComponentProps<{ id: string }> {}

interface IBlogState {
  blog: any;
  authorid: number;
  title: string;
  content: string;
  authors: Array<{
    id: string;
    name: string;
  }>;
  isShowingEdit: boolean;
  isShowingDelete: boolean;
}
