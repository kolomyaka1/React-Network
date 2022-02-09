import { NavLink } from 'react-router-dom';
import s from './DialogItem.module.css';

let DialogItem = (props) => {
    return (
        <div>
            <div className={s.dialog}>
                <img className={s.dialog__img} src="https://html5css.ru/howto/img_avatar.png" alt="" />
                <NavLink className={s.dialog__link} to={`/Dialogs/${props.id}`}>{props.name}</NavLink>
            </div>  
        </div>
    )
}



export default DialogItem;