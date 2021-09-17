import React, { useState, useRef } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ title: '', body: '' });

    const bodyInputRef = useRef();

    const addNewPost = e => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            ...post,
        };
        create(newPost);
        setPost({ title: '', body: '' });
        console.log(bodyInputRef.current.value);
    };

    return (
        <form action="">
            {/*Управляемый Компонент*/}
            <MyInput
                type="text"
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
                placeholder="Название поста"
            />
            <MyInput
                type="text"
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
                placeholder="Описание поста"
            />
            {/* Неуправляемый\Неконтролируемый кмпонет */}
            <MyInput ref={bodyInputRef} type="text" placeholder="Описание..." />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;
