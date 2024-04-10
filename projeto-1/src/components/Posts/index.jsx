import { useCallback, useEffect, useState } from 'react';
import './styles.css';

import { loadPosts } from '../../utils/load-posts';

import PostCard from '../PostCard';
import Button from '../Button';
import TextInput from '../TextInput';

const Posts = (props) => {
  const [ posts, setPosts ] = useState([]);
  const [ allPosts, setAllPosts ] = useState(props.posts ?? []);
  const [ searchValue, setSearchValue ] = useState('');
  const [ page, setPage ] = useState(0);
  const [ perPage ] = useState(10);

  const [ filteredPosts, setFilteredPosts ] = useState([]);
  const [ noMorePosts, setNoMorePosts ] = useState(false);

  const [ firstLoad, setFirstLoad ] = useState(true);

  const initialPage = useCallback(async () => {
    const postList = await loadPosts();
    setAllPosts(postList);
    setPosts(postList.slice(0, perPage));
    setFilteredPosts(postList.slice(0, perPage));

    setFirstLoad(false);
  }, [perPage]);

  const changePage = (page) => {
    setPosts([ ...posts, ...allPosts.slice(page*perPage,
      (page + 1)*perPage) ]);
  }

  const loadMorePosts = async () => {
    changePage(page + 1);
    setPage(page + 1);
    setNoMorePosts(posts.length >= allPosts.length && !searchValue);
  }

  useEffect( () => {
    if(firstLoad) initialPage();
  }, [
    firstLoad,
    initialPage,
  ]);

  useEffect( () => {
    setFilteredPosts(() =>
      !!searchValue ?
      allPosts.filter(
        post =>
        post.title.toLowerCase().includes(
          searchValue.toLowerCase())
      ) : posts
    );
  }, [allPosts, posts, searchValue]);

  return (
    <article className='posts'>
      <form
          className='search__form'
        >
          <TextInput
            value={searchValue}
            handleChange={e=>setSearchValue(e.target.value)}
          />
          {!!searchValue && (
            <p
              className='search-result__text'
            >
              Search results for: <em>{searchValue}</em>
            </p>
          )}
      </form>
      { filteredPosts.length > 0 && (
        <section
          className='wrapper'
        >
          {
            filteredPosts.map(
              post => <PostCard post={post} key={post.id} />
            )
          }
        </section>)
      }
      {
        filteredPosts.length === 0 && (
          <section
            className='wrapper'
          >
            <p>
              Não existem resultados para essa busca
            </p>
          </section>
        )
      }
      {
        !searchValue && (
          <Button
            className='posts__btn'
            text={'Load more posts'}
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )
      }
    </article>
  );
}

export default Posts;
