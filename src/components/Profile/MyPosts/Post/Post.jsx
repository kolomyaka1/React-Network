import s from './Post.module.css';
import cancel from '../../../../img/cancel.png';
import like from '../../../../img/emptyLike.png'
import Loader from '../../../preloader/loader';


let Post = (props) => {
    
    if (!props.profile) {
        return <Loader />
    }

    return (
        <div>
            <div className={s.post__wrapper}>
                <div className={s.item}>
                <img src={props.profile.photos.small ? props.profile.photos.small : 'https://html5css.ru/howto/img_avatar.png'} />
                    <div className={s.post__item__description}>
                        <span className={s.post__login}>{props.profile.fullName}</span>
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