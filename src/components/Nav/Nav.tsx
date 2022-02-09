import s from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import Friend from './Friend/Friend';
import { FC } from 'react';
import { AppStateType } from '../../redux/redux-store';
import { FriendNameType } from '../../types/types';

type PropsType = {
    friendName : Array<FriendNameType>
}

let Nav: FC<PropsType> = (props) => {
    return (
        <nav className={s.nav} >
            <div className={s.item}>
                <NavLink to="/Profile">Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/Dialogs">Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/News'>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Music'>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Users'>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Settings'>Settings</NavLink>
            </div>
            <Friend friendName={props.friendName} />
        </nav >
    )
}

export default Nav;