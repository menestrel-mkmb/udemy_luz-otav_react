import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      posts: [],
      counter: 0,
    };
  }

  getPosts = async () => {
    const postsJson = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json());

    this.setState({ posts: postsJson });
  }

  componentDidMount () {
    this.getPosts();
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    const { posts } = this.state;

    return (
    <div>
    {
      posts.map( post =>
        (<div key={post.id}>
          <h1>
            {post.title}
          </h1>
          <p>
            {post.body}
          </p>
        </div>)
        )
    }
    </div>)
  }
}

export default App;
