import './styles.css';
import { Component } from 'react';

import Posts from '../../components/Posts';

class Home extends Component {
  render() {
    return (
      <section className='container posts__sect'>
        <Posts posts={[]} />
      </section>
    );
  }
}

export default Home;
