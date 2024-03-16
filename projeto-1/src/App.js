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
      <div className='wrapper'>
      {
        posts.map( post =>
          (<div key={post.id} className='post card'>
            <img
              className='post__img'
              src={post.url}
            />
            <h1 className='post__title'>
              {post.title}
            </h1>
            <p className='post__body'>
              {post.body}
            </p>
          </div>)
          )
      }
      </div>)
    }
  }
  
  export default App;