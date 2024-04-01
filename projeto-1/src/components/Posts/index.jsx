import './styles.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts';

import PostCard from '../PostCard';
import Button from '../Button';

class Posts extends Component {
  state = {
    posts: [],
    allPosts: [],
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

  render() {
    const { allPosts, posts } = this.state;
    const noMorePosts = posts.length >= allPosts.length;

    return (
    <article className='posts'>
      <section
        className='wrapper'
      >
      {
        posts.map( 
          post => <PostCard post={post} key={post.id} />)
      }
      </section>
      <Button
        className='posts__btn'
        text={'Load more posts'}
        onClick={this.loadMorePosts}
        disabled={noMorePosts}
      />
    </article>
  );}
}

export default Posts;