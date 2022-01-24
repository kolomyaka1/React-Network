import s from './Post.module.css';
import cancel from '../../../../img/cancel.png';
import like from '../../../../img/emptyLike.png'


let Post = (props) => {
    
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
                    <img src={like}
                        alt="Likes"
                        className={s.post__likes__img}
                    />
                </div>
                <div>
                    <img src={cancel}
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