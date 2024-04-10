import './styles.css';

export default function PostCard(props) {
    const { post } = props;

    return (
    <div className='post card'>
        <img
            className='post__img'
            src={post.url}
            alt={post.title}
        />
        <div
            className='post__content'
        >
            <h1
                className='post__title'
            >
                {post.title}
            </h1>
            <p
                className='post__body'
            >
                {post.body}
            </p>
        </div>
    </div>)
}