import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      posts: []
    }
  }

  componentDidMount () {
    this.setState({
      posts: [
        {
          id: 0,
          title: 'Componente Montado - aguardando API',
          body: 'componentDidMount'
        }
      ]
    });
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
        ]
      });
    }, 5000);
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
