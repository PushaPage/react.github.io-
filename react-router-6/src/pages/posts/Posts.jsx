import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Spinner from '../../components/Loaders/Spinner';
import PostsFilter from '../../components/PostsFilter';
import AnimatedWrap from '../../components/AnimatedWrap';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();

    const postQuery = searchParams.get('post') || '';
    const latest = searchParams.has('latest');

    const startForm = latest ? 80 : 1;

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=95')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    if (!posts.length) {
        return <Spinner />;
    }

    return (
        <AnimatedWrap>
            <div className="container">
                <h1>Our news</h1>
                <PostsFilter setSearchParams={setSearchParams} postQuery={postQuery} latest={latest} />
                <div className="posts">
                    <Link to={`/posts/new`}>Add post</Link>
                    {posts
                        .filter(
                            post => post.title.toLowerCase().includes(postQuery.toLowerCase()) && post.id >= startForm
                        )
                        .map(post => {
                            return (
                                <Link key={post.id} to={`/posts/${post.id}`}>
                                    <div>{post.title}</div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </AnimatedWrap>
    );
};

export default Posts;
