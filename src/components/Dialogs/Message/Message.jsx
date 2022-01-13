import s from './Message.module.css';


let Message = (props) => {
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