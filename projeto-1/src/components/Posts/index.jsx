import './styles.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts';

import PostCard from '../PostCard';
import Button from '../Button';

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

    this.state = {
      ...this.state,
      page: page + 1
    }

    await this.getPosts();
  }

  handleChange = (e) => {
    const { value } = e.target;
    const { posts } = this.state;
    let searchResult = posts;

    this.setState({
      ...this.state,
      searchValue: value,
      posts: searchResult ?? posts
    });
  }

  render() {
    const { allPosts, posts, searchValue } = this.state;
    const noMorePosts = posts.length >= allPosts.length;

    return (
    <article className='posts'>
      <form
          className='search__form'
        >
          <br/><br/>
          <input
            type="search"
            placeholder="Search for post"
            onChange={this.handleChange}
            value={searchValue}
          />
        </form>
      <section
        className='wrapper'
      >
      {
        posts.map( 
          post => <PostCard post={post} key={post.id} />)
      }
      </section>
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