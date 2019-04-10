import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class GuestBlogPage extends React.Component<
  IGuestBlogProps,
  IGuestBlogState
> {
  constructor(props: IGuestBlogProps) {
    super(props);

    this.state = {
      blog: {},
      authorid: 0,
      title: "",
      content: "",
      authors: []
    };
  }

  async componentDidMount() {
    let r = await fetch(`/api/blogs/${this.props.match.params.id}`);
    let blog = await r.json();
    let a = await fetch("/api/authors");
    let users = await a.json();
    let authors: any = users.map((author: any) => {
      if (blog.authorid === author.name) {
        let authorid = author.id;
        this.setState({ authorid });
      }
      return {
        id: author.id,
        name: author.name
      };
    });
    this.setState({ authors });
    this.setState({ blog });
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
            <Link to="/blogs" className="btn my-btn">
              Go Back
            </Link>
          </div>
        </div>
      </>
    );
  }
}

interface IGuestBlogProps extends RouteComponentProps<{ id: string }> {}

interface IGuestBlogState {
  blog: any;
  authorid: number;
  title: string;
  content: string;
  authors: Array<{
    id: string;
    name: string;
  }>;
}
