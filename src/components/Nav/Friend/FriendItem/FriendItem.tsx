import s from './../Friend.module.css'

type OwnPropsType = {
    name : string
}

let FriendItem = (props:OwnPropsType) => {
    return (
        <a href="#">
            <div className={s.friend__item}><img className={s.friend__img} src="https://html5css.ru/howto/img_avatar.png" alt="ava-img" />
                <span className={s.friend__name}>{props.name}</span>
            </div>
        </a>
    )
}

export default FriendItem;
