import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class BlogsPage extends React.Component<
  IBlogsPageProps,
  IBlogsPageState
> {
  constructor(props: IBlogsPageProps) {
    super(props);

    this.state = {
      authorid: 7,
      title: "",
      content: "",
      authors: []
    };
  }

  async componentDidMount() {
    let a = await fetch("/api/authors");
    let authors = await a.json();
    this.setState({ authors });
  }

  async handleAdd() {
    event.preventDefault();
    let newBlog = {
      authorid: this.state.authorid,
      title: this.state.title,
      content: this.state.content
    };
    try {
      await fetch("api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBlog)
      });
      this.props.history.push("/blogs");
    } catch (e) {
      throw e;
    }
  }

  render() {
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
            <Link to="/blogs" className="btn my-btn">
              Cancel
            </Link>
          </form>
        </div>
      </>
    );
  }
}

interface IBlogsPageProps {
  history: any;
}

interface IBlogsPageState {
  authorid: number;
  title: string;
  content: string;
  authors: Array<{
    id: string;
    name: string;
  }>;
}
