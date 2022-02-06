import React, { FC } from 'react';
import { PostType, ProfileType } from '../../../types/types';
import Loader from '../../preloader/loader';
import s from './MyPosts.module.css';
import Post from './Post/Post';


type PropsType = {
    posts : Array<PostType>
    newPostText : string
    login : string | null
    profile : ProfileType | null
    updateNewPostText : (text:string) => void
    addPost : () => void
    deletePost : (id:number) => void
    likePost : (id:number) => void
    dislikePost : (id:number) => void
}


let MyPosts: FC<PropsType> = (props) => { // С помощью функции maps отрисовываем каждый элемент из props.state в созданную нами компоненту 
    
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

    let newPostElement = React.createRef<HTMLInputElement>();  // Привязываем ссылку на элемент на сайте для манипуляции над ним

    let addPost = () => {  // Данные функции создали также в state и передали их сюда
        props.addPost();
    }

    let onPostChange = () => { // Данные функции создали также в state и передали их сюда
        if (newPostElement.current) {
            let text = newPostElement.current.value;  // Сохраняем значение textarea в переменную
            props.updateNewPostText(text)
        }

    }

    return (
        <div className={s.myPosts__wrapper}>
            <h3 className={s.myPosts__title}>My posts</h3>
            <div>
                <div className={s.post__edit}>
                    <input onChange={onPostChange} type="text" placeholder='Create new post!' // При изменении в textarea вызываем нашу функцию
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