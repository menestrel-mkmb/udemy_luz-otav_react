import './App.css';

function App() {
  const state = {
    posts: [
      {
          id: 1,
          title: 'Título 1',
          text: 'Lorem1'
      },
      {
          id: 2,
          title: 'Título 2',
          text: 'Lorem2'
      },
      {
          id: 3,
          title: 'Título 3',
          text: 'Lorem3'
      }
    ]
  }

  const { posts } = state;

  return (
  <div>
  {
    posts.map( post =>
      <h1 key={post.id}>
        {post.title}
      </h1>)
  }
  </div>)
}

export default App;
