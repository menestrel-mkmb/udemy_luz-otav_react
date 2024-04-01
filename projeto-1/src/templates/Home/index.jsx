import './styles.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts';
import Posts from '../../components/Posts';

class Home extends Component {

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

  async componentDidMount () {
    await this.getPosts();
  }

  render() {
    const { page, perPage, posts } = this.state;

    return (
      <section className='container posts__sect'>
        <Posts
          posts={posts}
          page={page}
          perPage={perPage}
        />
      </section>)
  }
}
  
export default Home;