import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      posts: [],
      counter: 0,
      timeoutUpdate: null,

    };
  }

  handleTimeout = () => {
    this.timeoutUpdate = setTimeout(() => {
      this.setState({
        posts: [
          {
            id: 1,
            title: 'Título 1',
            body: 'Lorem1'
          },
          {
            id: 2,
            title: 'Título 2',
            body: 'Lorem2'
          },
          {
            id: 3,
            title: 'Título 3',
            body: 'Lorem3'
          }
        ],
        counter: this.state.counter + 1,
      });
    }, 1000);
    
  }

  componentDidMount () {
    this.handleTimeout();
  }

  componentDidUpdate() {
    clearTimeout(this.state.timeoutUpdate);
    this.handleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutUpdate);
  }

  render() {
    const { posts, counter } = this.state;

    return (
    <div>
    <h1>Contagem: {counter}</h1>
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
