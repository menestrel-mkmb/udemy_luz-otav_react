import './App.css';

function App() {
  const state = {
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
  }

  const { posts } = state;

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

export default App;
