import * as React from "react";

export default class EditForm extends React.Component<
  IEditFormProps,
  IEditFormState
> {
  constructor(props: IEditFormProps) {
    super(props);

    this.state = {
      blog: {
        id: "",
        authorid: "",
        title: "",
        content: "",
        _created: ""
      },
      authors: []
    };
  }

  async componentWillMount() {
    let r = await fetch(`/api/blogs/${this.props.id}`);
    let blog = await r.json();
    let a = await fetch("/api/authors");
    let authors = await a.json();
    this.setState({ blog, authors });
  }

  render() {
    return (
      <>
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
              value={this.state.blog.authorid}
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
              value={this.state.blog.title}
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              className="form-control"
              rows={5}
              onChange={e =>
                this.setState({
                  blog: {
                    content: e.target.value
                  }
                })
              }
              value={this.state.blog.content}
            />
          </div>
          <button className="btn save-btn">Save</button>
        </form>
      </>
    );
  }
}

interface IEditFormProps {
  id: string;
}

interface IEditFormState {
  blog: any;
  authors: Array<{
    id: string;
    name: string;
  }>;
}
