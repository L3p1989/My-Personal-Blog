import * as React from "react";
import * as moment from "moment";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class GuestBlogsPage extends React.Component<
  IGuestBlogsPageProps,
  IGuestBlogsPageState
> {
  constructor(props: IGuestBlogsPageProps) {
    super(props);

    this.state = {
      blogs: [],
      authors: []
    };
  }

  async componentDidMount() {
    let r = await fetch("/api/blogs");
    let blogs = await r.json();
    let a = await fetch("/api/authors");
    let users = await a.json();
    let authors: any = users.map((author: any) => ({
      id: author.id,
      name: author.name
    }));
    this.setState({ blogs, authors });
  }

  render() {
    return (
      <>
        <div className="container blogs-container">
          <h1>Blogs</h1>
          {this.state.blogs.map(blog => {
            return (
              <div
                key={blog.id}
                className="card text-center m-2 rounded blog-card"
              >
                <div className="card-body">
                  {this.state.authors.map(author => {
                    if (blog.authorid === author.id)
                      return (
                        <h2 key={author.id} className="card-title">
                          {author.name}
                        </h2>
                      );
                  })}
                  <h5 className="small p-1 d-inline-block">
                    {moment(blog._created).format("MMMM Do, YYYY")}
                  </h5>
                  <p className="card-text">
                    <Link to={`/blogs/${blog.id}`} className="link">
                      Title: {blog.title}
                    </Link>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

interface IGuestBlogsPageProps {}

interface IGuestBlogsPageState {
  blogs: Array<{
    id: string;
    authorid: string;
    title: string;
    content: string;
    _created: Date;
  }>;
  authors: Array<{
    id: string;
    name: string;
  }>;
}
