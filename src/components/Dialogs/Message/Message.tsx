import { FC } from 'react';
import s from './Message.module.css';


type PropsType = {
    message : string
}

let Message: FC<PropsType> = (props) => {
    return (
        <div className={s.message__wrapper}>
            <div>
                <img className={s.message__img} src="https://html5css.ru/howto/img_avatar.png" alt="" />
                <div className={s.message__img__name}>Dmitriy</div>
            </div>
            <div className={s.message}>{props.message}</div>
        </div>
    )
}



export default Message;