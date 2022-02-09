import s from './Post.module.css';
import cancel from '../../../../img/cancel.png';
import like from '../../../../img/emptyLike.png'
import successLike from '../../../../img/successLike.png'

let Post = (props) => {
    
    const deletePost = (id) => {
        props.deletePost(id);
    }

    const likePost = (id) => {
        props.likePost(id);
    }

    const dislikePost = (id) => {
        props.dislikePost(id);
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

                {props.isLiked
                    ? <div className={s.likes}><span>{props.likesCounter}</span>
                    <img src={successLike}
                        alt="Likes"
                        className={s.post__likes__img}
                        onClick={() => dislikePost(props.id)}
                    /></div>
                    : <div className={s.likes}><span>{props.likesCounter}</span>
                        <img src={like}
                            alt="Likes"
                            className={s.post__likes__img}
                            onClick={() => likePost(props.id)}
                        /></div>
                }


                <div>
                    <img src={cancel}
                        alt="CloseButton"
                        className={s.close__buton}
                        onClick={() => deletePost(props.id)}
                        id={props.id}
                    />
                </div>
            </div>
        </div>
    )
}


export default Post;