import React, { Component } from "react";
import http from "./services/httpService";
import config from './config.json'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";



class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const api = config.apiEndPoint;
    const { data: posts } = await http.get(api);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);

    console.log(post);
    const posts = [post, ...this.state.posts];

    this.setState({ posts });
    return;
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await http.put(`${config.apiEndpoint}/${post.id}`, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete(`${config.apiEndpoint}/${post.id}`);
      // await http.delete(`${config.apiEndpoint}/${post.id}`);
      // throw new Error('');
    } catch (ex) {
      // Expected (404, 400: bad request)
      // - Display a specific error message
      if (ex.response && ex.response.status === 404) {
        alert("This post has already been deleted");
      }

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
