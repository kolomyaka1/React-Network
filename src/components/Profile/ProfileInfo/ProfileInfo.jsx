import s from './ProfileInfo.module.css';
import Loader from '../../preloader/loader';

import ProfileStatusWHooks from './ProfileStatusWHooks';

let ProfileInfo = (props) => {
    debugger
    if (!props.profile) {
        return <Loader />
    } else {
        return (
            <div>
                <div className={s.description__block}>
                    <img src={props.profile.photos.large ? props.profile.photos.large : 'https://html5css.ru/howto/img_avatar.png'} className={s.profile__img} alt='ava-logo' />
                    <div className={s.profile__contacts}>
                        <h4 className={s.profile__title}>Contacts : </h4>
                        <div>Name: {props.profile.fullName}</div>
                        <div className={s.contacts__block}>
                            <div>Facebook: {props.profile.contacts.facebook ? props.profile.contacts.facebook : 'Не указано'}</div>
                            <div>VK: {props.profile.contacts.vk ? props.profile.contacts.vk : "Не указано"}</div>
                            <div>Twitter: {props.profile.contacts.twitter ? props.profile.contacts.twitter : "Не указано"}</div>
                            <div>Instagram: {props.profile.contacts.instagram ? props.profile.contacts.instagram : 'Не указано'}</div>
                            <div className={s.profile__status}>
                                About: {props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : 'Не указано'}
                            </div>
                            <ProfileStatusWHooks status={props.status}  updateUserStatus={props.updateUserStatus}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default ProfileInfo;