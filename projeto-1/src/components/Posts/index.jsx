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
    this.state = {
      ...this.state,
      page: this.state.page + 1
    }
    await this.getPosts();
  }

  render() {
    const { posts } = this.state;

    return (
    <article className='posts wrapper'>
      {
        posts.map( 
          post => <PostCard post={post} key={post.id} />)
      }
      <Button
        text={'Load more posts'}
        onClick={this.loadMorePosts}
      />
    </article>
  );}
}

export default Posts;