import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { json } from "../../utils/api";

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
    try {
      let blog = await json(`/api/blogs/${this.props.match.params.id}`);
      let users = await json("/api/authors");
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
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <>
        <div className="container blog-container">
          <h1 className="author-name">{this.state.blog.authorid}</h1>
          <h2 className="blog-title">
            <u>{this.state.blog.title}</u>
          </h2>
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
