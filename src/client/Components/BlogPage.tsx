import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export default class BlogPage extends React.Component<IBlogProps, IBlogState> {
  constructor(props: IBlogProps) {
    super(props);

    this.state = {
      blog: {}
    };
  }

  async componentWillMount() {
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
          <p>
            <button className="btn edit-blog">Edit</button>
            <button className="btn delete-blog">Delete</button>
          </p>
        </div>
      </>
    );
  }
}

interface IBlogProps extends RouteComponentProps<{ id: string }> {}

interface IBlogState {
  blog: any;
}
