import React, { useMemo, useState } from 'react';
import Counter from './components/Counter';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/myModal/MyModal';
import MyButton from './components/UI/button/MyButton';

import './styles/App.css';

function App() {
    // const [value, setValue] = useState('ТЕКСТ В ИМПУТЕ');
    const [posts, setPosts] = useState([
        { id: 1, title: 'aa', body: 'ff' },
        { id: 2, title: 'bb', body: 'ee' },
        { id: 3, title: 'cc', body: 'dd' },
    ]);

    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
    }, [filter.query, sortedPosts]);

    const createPost = newPost => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const removePost = post => setPosts(posts.filter(p => p.id !== post.id));

    return (
        <div className="App">
            <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <Counter />

            <hr style={{ margin: '15px 0' }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            <PostList remove={removePost} posts={sortedAndSearchPosts} title="Посты про js" />

            {/* <input type="text" value={value} onInput={event => setValue(event.target.value)} /> */}
        </div>
    );
}

export default App;
