import s from './ProfileInfo.module.css';
import Loader from '../../preloader/loader';
import ProfileStatusWHooks from './ProfileStatusWHooks';

let ProfileInfo = (props) => {
    
    let isOwner = false;

    if (props.profile) {
        if (props.profile.userId === 21430) {
            isOwner = true;
        }
    }

    const mainPhotoChange = (e) => {

        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    if (!props.profile) {
        return <Loader />
    } else {
        return (
            <div>
                <div className={s.description__block}>
                    <img src={props.profile.photos.large ? props.profile.photos.large : 'https://html5css.ru/howto/img_avatar.png'} className={s.profile__img} alt='ava-logo' />
                    <div className={s.profile__contacts}>
                        <h4 className={s.profile__title}>Contacts : </h4>

                        <div className={s.contacts__block}>

                            <ProfileData profile={props.profile} isOwner={isOwner} />

                            <ProfileStatusWHooks status={props.status} updateUserStatus={props.updateUserStatus} />

                            {props.profile.userId === 21430 &&
                                <div className={s.profile__addFile}>
                                    <input type="file" className={s.profile__photos_change} onChange={mainPhotoChange} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const ProfileData = ({ profile }) => {
    
    return (
        <div>
            <div>Name: {profile.fullName}</div>
            <div>VK: {profile.contacts.vk ? profile.contacts.vk : "Не указано"}</div>
            <div>GitHub: {profile.contacts.github ? profile.contacts.github : "Не указано"}</div>
            <div>Instagram: {profile.contacts.instagram ? profile.contacts.instagram : 'Не указано'}</div>
            <div className={s.profile__status}>
                About: {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : 'Не указано'}
            </div>
        </div>
    )
}



export default ProfileInfo;