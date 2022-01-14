import React from 'react';
import s from './users.module.css';
import {NavLink} from 'react-router-dom';



let Users = (props) => {
    
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (pages.length < 10) {
            pages.push(i);
        }
    }

    // if (!props.isAuth) {
    //     return <Navigate replace to='/Login' />
    // }
    
    return <div>
        <div className={s.page__wrapper}>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.selectedPage} onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
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
}

export default Users;