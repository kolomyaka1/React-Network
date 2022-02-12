import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import headerLogo from '../../img/headerLogo';
import { DispatchPropsTypeForHeader, PropsTypeForHeader } from './HeaderContainer';
import React from 'react';
import { Navigate } from 'react-router'



let Header: React.FC<PropsTypeForHeader & DispatchPropsTypeForHeader> = (props) => {
    
    const logout = () => {
        props.logout();
        window.location.reload();
    }

    return (
        <header className={s.header}>
            <img src={headerLogo} alt='header-logo'/>
            <div className={s.login__block}>
                {props.isAuth
                 ? <div className={s.login__auth}>
                        {/* @ts-ignore */}
                        <span className={s.login__username}>{props.login}</span><input type='image' src="https://img.icons8.com/windows/344/exit.png" onClick={logout} className={s.login__exit} alt="logout" />
                    </div>
                 : <NavLink to={'/login'} className={s.login__link}><span>Login</span></NavLink>
                }

            </div>
        </header>
    )
}

export default Header;