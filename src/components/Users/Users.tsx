import React from 'react';
import s from './users.module.css';
import {NavLink} from 'react-router-dom';
import { UserType } from '../../types/types';

type OwnPropsType = {
    users : Array<UserType>
    totalUsersCount : number
    pageSize : number
    currentPage : number
    isAuth : boolean
    onPageChanged : (page: number) => void
    unfollow : (id: number) => void
    follow : (id: number) => void
}

let Users = (props: OwnPropsType) => {
    
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length < 10) {
            pages.push(i);
        }
    }

    return (
        <div>
            <div className="news__block">
            <div className='pagination'>
                {pages.map(p => {
                    // @ts-ignore
                    return <button className={props.currentPage === p && 'pagination__active'} onClick={(e) => { props.onPageChanged(p) }}>{p}</button>
                })}
            </div>
        {
            props.users.map(u => <div className={s.users__wrapper}>
                <div className={s.users__info} key={u.id}>
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
                            <button className={s.users__button}  onClick={() => {                                            
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
    </div>
    )
}

export default Users;