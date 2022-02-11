import s from './Post.module.css';
import successLike from '../../../../img/successLike.png'
import emptyLike from '../../../../img/emptyLike.png'
import close from '../../../../img/close.png'

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
                <img alt='ava' src={props.profile.photos.small ? props.profile.photos.small : 'https://html5css.ru/howto/img_avatar.png'} />
                    <div className={s.post__item__description}>
                        <span className={s.post__login}>{props.profile.fullName}</span>
                        <span className={s.message}>{props.message}</span>
                    </div>    
                </div>     
                <img src={close} alt="close" className={s.close__button} onClick={() => deletePost(props.id)}/>
                    {props.isLiked 
                    ? <div className={s.likes}><span>{props.likesCounter}</span>
                    <img src={successLike} alt="Like" 
                    className={s.post__likes__img} onClick={() => dislikePost(props.id)} />
                    </div>
                    : <div className={s.likes}><span>{props.likesCounter}</span>
                    <img src={emptyLike} alt="EmpyLike" className={s.post__likes__img} 
                    onClick={() => likePost(props.id)} />
                    </div> 
                    }

            </div>
        </div>
    )
}

export default Post;