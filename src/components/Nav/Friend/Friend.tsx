import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';
import { FriendNameType } from '../../../types/types';
import s from './Friend.module.css'
import FriendItem from './FriendItem/FriendItem';


let Friend = () => {
    const friendName = useSelector<AppStateType, Array<FriendNameType>>(state => state.sidebar.friendName)

    let FriendElement = friendName.map(el =>
        <FriendItem name={el.name} key={el.name} />
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