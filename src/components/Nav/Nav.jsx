import s from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import Friend from './Friend/Friend';



let Nav = (props) => {
    return (
        <nav nav className={s.nav} >
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
            <Friend state={props.state} />
        </nav >
    )
}

export default Nav;