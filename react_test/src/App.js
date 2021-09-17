import React, { useState } from 'react';
import Counter from './components/Counter';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';

import './styles/App.css';

function App() {
    // const [value, setValue] = useState('ТЕКСТ В ИМПУТЕ');
    const [posts, setPosts] = useState([
        { id: 1, title: 'aa', body: 'ff' },
        { id: 2, title: 'bb', body: 'ee' },
        { id: 3, title: 'cc', body: 'dd' },
    ]);

    const [selectedSort, setSelectedSort] = useState('');

    const sortPosts = sort => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
        console.log(sort);
    };

    const createPost = newPost => setPosts([...posts, newPost]);

    const removePost = post => setPosts(posts.filter(p => p.id !== post.id));

    return (
        <div className="App">
            <Counter />
            <PostForm create={createPost} />
            <hr style={{ margin: '15px 0' }} />
            <div>
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка"
                    options={[
                        { value: 'title', name: 'По названию' },
                        { value: 'body', name: 'По описанию' },
                    ]}
                />
            </div>
            {posts.length ? (
                <PostList remove={removePost} posts={posts} title="Посты про js" />
            ) : (
                <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
            )}

            {/* <input type="text" value={value} onInput={event => setValue(event.target.value)} /> */}
        </div>
    );
}

export default App;
