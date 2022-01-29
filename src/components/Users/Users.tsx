import React,{FC} from 'react';
import s from './users.module.css';
import {NavLink} from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    totalUsersCount : number
    pageSize : number
    currentPage : number
    onPageChanged : (pageNumber : number) => void
    isAuth : boolean
    isFollowing : boolean
    toggleIsFollowing : boolean
    users : Array<UserType>
    unfollow : (id: number) => void
    follow : (id: number) => void
}


let Users: FC<PropsType>  = (props) => {

    return <div>
        <div className={s.page__wrapper}>
        </div>
        {
            props.users.map(u => <div key={u.id} className={s.users__wrapper}>
                <div className={s.users__info}>
                    <div>
                        <NavLink to={'/Profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : 
                            'https://html5css.ru/howto/img_avatar.png'}
                            className={s.photo} alt="" />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            <button className={s.users__button} onClick={() => {
                                props.unfollow(u.id);
                            }}>unfollow</button> :
                            <button className={s.users__button} onClick={() => {                                            
                                props.follow(u.id);
                            }}>follow</button>}

                    </div>
                </div>
                <div className={s.users__description}>
                    <div className={s.users__firtTitle}>
                        <div className={s.users__name}>{u.name}</div>
                        <div className={s.users__status}>{u.status}</div>
                    </div>
                </div>
            </div>)
        }
    </div>
}

export default Users;