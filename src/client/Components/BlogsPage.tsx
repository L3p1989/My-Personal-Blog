import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class BlogsPage extends React.Component<
  IBlogsPageProps,
  IBlogsPageState
> {
  constructor(props: IBlogsPageProps) {
    super(props);

    this.state = {
      blogs: [],
      authors: []
    };
  }

  async componentWillMount() {
    let r = await fetch("/api/blogs");
    let blogs = await r.json();
    let a = await fetch("/api/authors");
    let authors = await a.json();
    this.setState({ blogs, authors });
  }

  render() {
    return (
      <>
        <div className="container blogs-container">
          <h1>Blogs</h1>
          {this.state.blogs.map(blog => {
            return (
              <div className="card text-center m-2 rounded blog-card">
                <div className="card-body">
                  {this.state.authors.map(author => {
                    if (blog.authorid === author.id)
                      return <h2 className="card-title">{author.name}</h2>;
                  })}
                  <p className="card-text">
                    <Link to={`/blogs/${blog.id}`} className="blog-btn link">
                      Title: {blog.title}
                    </Link>
                  </p>
                </div>
              </div>
            );
          })}
          <p>
            <button className="btn add-blog">New Blog</button>
          </p>
        </div>
      </>
    );
  }
}

interface IBlogsPageProps {}

interface IBlogsPageState {
  blogs: Array<{
    id: string;
    authorid: string;
    title: string;
    content: string;
  }>;
  authors: Array<{
    id: string;
    name: string;
  }>;
}
