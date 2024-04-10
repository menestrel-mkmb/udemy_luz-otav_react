import './styles.css';

import PostCard from '../PostCard';

const Posts = (props) => {
  const { firstLoad, posts } = props;

  return (
    <article
      className='posts wrapper'
    >
    { posts.length > 0 ?
      posts.map(
        post => <PostCard post={post} key={post.id} />
      ) : (
        <p>
          {firstLoad ? 'Carregando...' : 'Não existem resultados para essa busca' }
        </p>
      )
    }
    </article>
  )
}

export default Posts;
