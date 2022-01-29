import { FC } from 'react';
import { AppStateType } from '../../../redux/redux-store';
import { FriendNameType } from '../../../types/types';
import s from './Friend.module.css'
import FriendItem from './FriendItem/FriendItem';

type PropsType = {
    friendName : Array<FriendNameType>
}

let Friend: FC<PropsType> = (props) => {

    let FriendElement = props.friendName.map(el =>
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