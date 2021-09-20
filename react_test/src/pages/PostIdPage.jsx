import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPosts] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchingById, isLoading, error] = useFetching(async id => {
        const response = await PostService.getById(id);
        setPosts(response.data);
    });

    const [fetchComments, isComLoading, comError] = useFetching(async id => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchingById(params.id);
        fetchComments(params.id);
    }, []);
    console.log(params);
    return (
        <div style={{ marginTop: '50px' }}>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    {post.id}. {post.title}
                </div>
            )}
            {error && <h1>Произошла ошибка {error}</h1>}
            {comError && <h1>Произошла ошибка {comError}</h1>}

            {isComLoading ? (
                <Loader />
            ) : (
                <div>
                    {comments.map(comm => (
                        <div key={comm.id} style={{ marginTop: '15px' }}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostIdPage;
