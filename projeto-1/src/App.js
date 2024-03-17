import './App.css';
import { Component } from 'react';
import PostCard from './components';

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
    const photosJson = await fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json());

    let completePosts = [];

    postsJson.forEach((post, index) => {
      completePosts.push({
        ...post,
        ...photosJson[index],
      })
    })

    this.setState({ posts: completePosts });
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
      <section className='container posts__sect'>
      <div className='posts wrapper'>
      {
        posts.map( 
          post => <PostCard post={post} key={post.id} />)
      }
      </div>
      </section>)
    }
  }
  
  export default App;