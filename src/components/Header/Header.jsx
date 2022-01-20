import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import headerLogo from '../../img/headerLogo';

let Header = (props) => {

    const logout = () => {
        props.logout();
        window.location.reload();
    }

    return (
        <header className={s.header}>
            <img src={headerLogo} alt='header-logo'/>
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