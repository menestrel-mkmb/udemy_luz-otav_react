import './index.css';

import PostCard from '../PostCard';

const Posts = ({ posts }) => {
    return(
    <div className='posts wrapper'>
      {
        posts.map( 
          post => <PostCard post={post} key={post.id} />)
      }
    </div>
    );
}

export default Posts;