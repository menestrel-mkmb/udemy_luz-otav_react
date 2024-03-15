import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      posts: [],
      counter: 0,
      timer: null,

    };
  }

  handleTimeout = () => {
    setTimeout(() => {
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
        timeoutUpdate: null,
      });
    }, 1000);
  }

  componentDidMount () {
    this.handleTimeout();
  }

  componentDidUpdate() {
    this.handleTimeout();
  }

  componentWillUnmount() {
    this.setState({
      timeoutUpdate: null
    })
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
