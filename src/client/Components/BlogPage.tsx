import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditForm from "./EditForm";

export default class BlogPage extends React.Component<IBlogProps, IBlogState> {
  constructor(props: IBlogProps) {
    super(props);

    this.state = {
      blog: {},
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
    this.setState({ blog });
  }

  render() {
    return (
      <>
        <div className="container blog-container">
          <h1 className="author-name">{this.state.blog.authorid}</h1>
          <h2 className="blog-title">{this.state.blog.title}</h2>
          <p className="blog-content">"{this.state.blog.content}"</p>
          <div>
            <button className="btn edit-blog" onClick={this.toggleEdit}>
              Edit
            </button>
            <button className="btn delete-blog" onClick={this.toggleDelete}>
              Delete
            </button>
            <div
              className="container edit-container rounded"
              style={{ display: this.state.isShowingEdit ? "inherit" : "none" }}
            >
              <EditForm
                id={this.props.match.params.id}
                history={this.props.history}
              />
            </div>
            <div
              style={{
                display: this.state.isShowingDelete ? "inherit" : "none"
              }}
              className="delete-confirm"
            >
              <p>Are you sure you want to delete this blog?</p>
              <button
                className="btn save-btn"
                onClick={() => this.handleDelete()}
              >
                Yes
              </button>
              <button className="btn cancel-btn" onClick={this.toggleDelete}>
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
  isShowingEdit: boolean;
  isShowingDelete: boolean;
}
