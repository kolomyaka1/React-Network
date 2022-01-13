import s from './Friend.module.css'
import FriendItem from './FriendItem/FriendItem';


let Friend = (props) => {
    

    let FriendElement = props.state.friendName.map(el =>
        <FriendItem name={el.name} />
    )
    return (
        <div className={`${s.item}  ${s.friend}`}>
            <a className={s.friends__link}>Friends</a>
            <div className={s.friend__wrapper}>
                { FriendElement }
            </div>
        </div>
    )
}

export default Friend;