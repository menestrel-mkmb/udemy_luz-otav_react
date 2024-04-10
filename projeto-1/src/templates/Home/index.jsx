import './styles.css';

import Posts from '../../components/Posts';

const Home = () => {
  return (
    <section className='container posts__sect'>
      <Posts posts={[]} />
    </section>
  );
}

export default Home;
