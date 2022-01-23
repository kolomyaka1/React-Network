import s from './Post.module.css';

let Post = (props) => {
    debugger
    return (
        <div>
            <div className={s.post__wrapper}>
                <div className={s.item}>
                    <img src="https://html5css.ru/howto/img_avatar.png" alt='ava-img' />
                    <div className={s.post__item__description}>
                        <span className={s.post__login}>{props.login}</span>
                        <span className={s.message}>{props.message}</span>
                    </div>
                </div>
                <div className={s.likes}>
                    <span>{props.likesCounter}</span>
                    <img src="https://cdn-icons.flaticon.com/png/512/2589/premium/2589054.png?token=exp=1642896459~hmac=aa0d5a4cd2ffb636b4fbab663310644a"
                        alt="Likes"
                        className={s.post__likes__img}
                    />
                </div>
                <div>
                    <img src="https://cdn-icons.flaticon.com/png/512/2550/premium/2550327.png?token=exp=1642896409~hmac=8a17699ac19b56f8b94a33a2441bd73a"
                        alt="CloseButton"
                        className={s.close__buton}
                        onClick={props.deletePost}
                        key={props.key}
                    />
                </div>
            </div>
        </div>
    )
}

// props.deletePost
export default Post;