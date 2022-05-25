import { useParams, link, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Loaders/Spinner';
import AnimatedWrap from '../../components/AnimatedWrap';

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);

    const goBack = () => navigate(-1);
    const goHome = () => navigate('/', { replace: true, state: {} });

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);

    if (!post) {
        return <Spinner />;
    }

    return (
        <AnimatedWrap>
            <div className="container">
                <h1>{post.title}</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-link"
                    onClick={goBack}
                    width={20}
                    height={20}
                    viewBox="0 0 512 512"
                >
                    <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" />
                </svg>
                <div className="post text-center">
                    <p>{post.body}</p>
                    <Link to={`/posts/${id}/edit`}>Edit this post</Link>
                </div>
                <div className="mt-10 text-center">
                    {/* Bad approach */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-link"
                        onClick={goHome}
                        width={34}
                        height={34}
                        title="Go home"
                        viewBox="0 0 576 512"
                    >
                        <path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.6 483.2 483.9 512 448.5 512H326.4L288 448L368.8 380.7C376.6 374.1 376.5 362.1 368.5 355.8L250.6 263.2C235.1 251.7 216.8 270.1 227.8 285.2L288 368L202.5 439.2C196.5 444.3 194.1 452.1 199.1 459.8L230.4 512H128.1C92.75 512 64.09 483.3 64.09 448V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L416 100.7V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z" />
                    </svg>
                </div>
            </div>
        </AnimatedWrap>
    );
};

export default Post;
