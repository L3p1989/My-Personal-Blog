import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class BlogsPage extends React.Component<
  IBlogsPageProps,
  IBlogsPageState
> {
  constructor(props: IBlogsPageProps) {
    super(props);

    this.state = {
      blog: {
        authorid: "",
        title: "",
        content: ""
      },
      authors: []
    };
  }

  async componentWillMount() {
    let a = await fetch("/api/authors");
    let authors = await a.json();
    this.setState({ authors });
  }

  render() {
    return (
      <>
        <div className="container addform-container">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Who are you?"
                onChange={e =>
                  this.setState({
                    blog: {
                      authorid: e.target.value
                    }
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="What's the title of your blog?"
                onChange={e =>
                  this.setState({
                    blog: {
                      title: e.target.value
                    }
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
                    blog: {
                      content: e.target.value
                    }
                  })
                }
              />
            </div>
            <button className="btn save-btn">Save</button>
            <Link to="/blogs" className="btn cancel-btn">
              Cancel
            </Link>
          </form>
        </div>
      </>
    );
  }
}

interface IBlogsPageProps {}

interface IBlogsPageState {
  blog: any;
  authors: Array<{
    id: string;
    name: string;
  }>;
}
