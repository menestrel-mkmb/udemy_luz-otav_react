import './styles.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts';

import PostCard from '../PostCard';
import Button from '../Button';
import TextInput from '../TextInput';

class Posts extends Component {
  state = {
    posts: [],
    allPosts: [],
    searchValue: '',
    page: 0,
    perPage: 10
  };

  getPosts = async () => {
    const { posts, page, perPage } = this.state;
    
    const completePosts = await loadPosts();

    this.setState({
      ...this.state,
      posts: [ ...posts, ...completePosts.slice(page*perPage,
        (page + 1)*perPage) ],
      allPosts: completePosts
    });
  }

  async componentDidMount() {
    return await this.getPosts();
  }

  loadMorePosts = async () => {
    const { page } = this.state;

    // eslint-disable-next-line
    this.state = {
      ...this.state,
      page: page + 1
    }

    await this.getPosts();
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      ...this.state,
      searchValue: value
    });
  }

  render() {
    const { allPosts, posts, searchValue } = this.state;
    const noMorePosts = posts.length >= allPosts.length;

    const filteredPosts = !!searchValue ?
        posts.filter(post => post.title.toLowerCase().includes(
                                  searchValue.toLowerCase())
        ) : posts;

    return (
    <article className='posts'>
      <form
          className='search__form'
        >
          <TextInput
            value={searchValue}
            handleChange={this.handleChange}
          />
      </form>
      { filteredPosts.length > 0 && (
        <section
          className='wrapper'
        >
          {
            filteredPosts.map( 
              post => <PostCard post={post} key={post.id} />)
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
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        )
      }
    </article>
  );}
}

export default Posts;