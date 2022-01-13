import s from './Post.module.css';

let Post = (props) => {
    return (
        <div>
            <div className={s.post__wrapper}>
                <div className={s.item}>
                    <img src="https://html5css.ru/howto/img_avatar.png" />
                    <span className={s.message}>{props.message}</span>
            </div>
                    <div className={s.likes}>
                        <span>Likes </span>
                        <span>{props.likesCounter}</span>
                    </div>
                </div>
            </div>
    )
}

export default Post;