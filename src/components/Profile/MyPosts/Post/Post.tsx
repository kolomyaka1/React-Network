import s from './Post.module.css';
import successLike from '../../../../img/successLike.png'
import emptyLike from '../../../../img/emptyLike.png'
import close from '../../../../img/close.png'
import { ProfileType } from '../../../../types/types';
import Loader from '../../../preloader/loader';

type OwnPropsType = {
    likesCounter : number
    key : number
    id : number
    login : string | null
    message : string
    profile : ProfileType | null
    isLiked : boolean    
    deletePost : (id:number) => void
    likePost : (id:number) => void
    dislikePost : (id:number) => void
}

let Post = (props:OwnPropsType) => {
    const deletePost = (id: number) => {
        props.deletePost(id);
    }

    const likePost = (id: number) => {
        props.likePost(id);
    }

    const dislikePost = (id: number) => {
        props.dislikePost(id);
    }


    if (!props.profile) {
        return <Loader />
    }
    
    return (
        <div>
            <div className={s.post__wrapper}>
                <div className={s.item}>
                {/*  @ts-ignore */}
                <img alt='ava' src={props.profile.photos ? props.profile.photos.small : 'https://html5css.ru/howto/img_avatar.png'} />
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