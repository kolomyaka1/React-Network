import React from 'react';
import Loader from '../../preloader/loader';
import s from './MyPosts.module.css';
import Post from './Post/Post';




let MyPosts = (props) => { // С помощью функции maps отрисовываем каждый элемент из props.state в созданную нами компоненту 
    
    if (!props.profile) {
        return <Loader />
    }
    let postsElements = props.posts.map((el) => <Post login={props.login}
        message={el.message}
        likesCounter={el.likesCounter}
        posts={props.posts}
        deletePost={props.deletePost}
        key={el.id}
        profile={props.profile}
        id={el.id}
        isLiked={el.isLiked}
        likePost={props.likePost}
        dislikePost={props.dislikePost}
    />
    )

    let newPostElement = React.createRef();  // Привязываем ссылку на элемент на сайте для манипуляции над ним

    let addPost = () => {  // Данные функции создали также в state и передали их сюда
        props.addPost();
    }

    let onPostChange = () => { // Данные функции создали также в state и передали их сюда
        let text = newPostElement.current.value;  // Сохраняем значение textarea в переменную
        props.updateNewPostText(text)
    }

    return (
        <div className={s.myPosts__wrapper}>
            <h3 className={s.myPosts__title}>My posts</h3>
            <div>
                <div className={s.post__edit}>
                    <input onChange={onPostChange} type="text" placeholder='Сделай новый пост!' // При изменении в textarea вызываем нашу функцию
                        className={s.post__area} ref={newPostElement}
                        value={props.newPostText} // Значение берем не с UI, а из state
                    />
                    <button onClick={addPost} className={s.add__button}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>

                {postsElements}

            </div>
        </div>
    )
}

export default MyPosts;