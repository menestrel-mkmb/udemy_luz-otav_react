import './App.css';
import { Component } from 'react';

import { loadPosts } from './utils/load-posts';
import Posts from './components/Posts';

class App extends Component {  
  state = {
    posts: [],
    counter: 0,
  };

  getPosts = async () => {
    const completePosts = await loadPosts();

    this.setState({ posts: completePosts });
  }

  async componentDidMount () {
    await this.getPosts();
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    const { posts } = this.state;

    return (
      <section className='container posts__sect'>
        <Posts posts={posts} />
      </section>)
  }
}
  
  export default App;