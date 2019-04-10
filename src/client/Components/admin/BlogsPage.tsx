import * as React from "react";
import * as moment from "moment";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { json } from "../../utils/api";

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

  async componentDidMount() {
    try {
      let blogs = await json("/api/blogs");
      let users = await json("/api/authors");
      let authors: any = users.map((author: any) => ({
        id: author.id,
        name: author.name
      }));
      this.setState({ blogs, authors });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <>
        <div className="container blogs-container">
          <h1>Blogs</h1>
          <p>
            <Link to="/new-blog" className="btn my-btn">
              New Blog
            </Link>
          </p>
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
                    <Link to={`/admin/blogs/${blog.id}`} className="link">
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

interface IBlogsPageProps {}

interface IBlogsPageState {
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
