import React, { useEffect, useState, useRef } from 'react';
import Counter from '../components/Counter';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/myModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';
import { getPageCount } from '../utils/page';
import MySelect from '../components/UI/select/MySelect';

const Posts = () => {
    // const [value, setValue] = useState('ТЕКСТ В ИМПУТЕ');
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    // const sortedPosts = useMemo(() => {
    //     if (filter.sort) {
    //         return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    //     }
    //     return posts;
    // }, [filter.sort, posts]);

    // const sortedAndSearchPosts = useMemo(() => {
    //     return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
    // }, [filter.query, sortedPosts]);

    const lastElement = useRef();

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = newPost => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const changePage = page => {
        setPage(page);
        // fetchPosts(limit, page);
    };

    const removePost = post => setPosts(posts.filter(p => p.id !== post.id));
    return (
        <div>
            <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <Counter />

            <hr style={{ margin: '15px 0' }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Показать все' },
                ]}
            />
            {postError && <h1>Произошла ошибка {postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про js" />
            <div ref={lastElement} style={{ height: '20px' }} />
            {isPostsLoading && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Loader />
                </div>
            )}
            {false && <Pagination totalPages={totalPages} page={page} changePage={changePage} />}
            {/* <input type="text" value={value} onInput={event => setValue(event.target.value)} /> */}
        </div>
    );
};

export default Posts;
