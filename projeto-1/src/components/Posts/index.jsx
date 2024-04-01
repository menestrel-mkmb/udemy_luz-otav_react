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
    const { page, perPage } = this.state;
    
    const completePosts = await loadPosts();

    this.setState({
      posts: completePosts.slice(page,
                  page*perPage + perPage),
      allPosts: completePosts
    });
  }

  async componentDidMount() {
    return await this.getPosts();
  }

  loadMorePosts = () => {
    console.log('loadMorePosts');
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
        text={'Load more'}
        onClick={this.loadMorePosts}
      />
    </article>
  );}
}

export default Posts;