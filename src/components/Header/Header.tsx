import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import home from '../../img/home.png';
import {Navigate} from 'react-router-dom'
import { FC } from 'react';


type PropsType = {
    isAuth : boolean
    logout : () => void
    login : (email:string, password:string, captcha:string) => void

}

let Header: FC<PropsType> = (props) => {

    const logout = () => {
        props.logout();
        window.location.reload();
    }

    return (
        <header className={s.header}>
            {/* @ts-ignore  Ошибка на OnClick Пока не знаю как исправить :(  */ }  
            <NavLink to="/Profile"><img src={home} onClick={<Navigate replace to='/Profile' />}  alt='header-logo' /></NavLink>
            
            <div className={s.login__block}>
                {props.isAuth 
                ? <div className={s.header__login}><span className={s.login__username}>{props.login}</span><input type="image" onClick={logout} src="https://img.icons8.com/windows/344/exit.png" /></div>
                : <NavLink to={'/login'} className={s.login__link}><span>Login</span></NavLink>
                }
            </div>
        </header>
    )
}

export default Header;