import './styles.css';

import PostCard from '../PostCard';

const Posts = (props) => {
  const { firstLoad, posts } = props;

  return (
    <article className='posts wrapper'>

      { posts.length > 0 ?
        posts.map(
          post => <PostCard post={post} key={post.id} />
        ) : (
          <section
            className='wrapper'
          >
            { firstLoad ?
              <p>('Carregando...')</p> :
              <p>('Não existem resultados para essa busca)</p>
            }
          </section>
        )
      }
    </article>
  );
}

export default Posts;
