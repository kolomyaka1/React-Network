import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import headerLogo from '../../img/headerLogo';

let Header = (props) => {
    
    return (
        <header className={s.header}>
            <img src={headerLogo} alt='header-logo'/>
            <div className={s.login__block}>
                {props.isAuth ? <span className={s.login__username}>{props.login}</span> :
                    <NavLink to={'/login'} className={s.login__link}><span>Login</span></NavLink>
                }

            </div>
        </header>
    )
}

export default Header;