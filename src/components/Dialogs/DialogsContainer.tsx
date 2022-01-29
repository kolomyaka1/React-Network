import { connect } from 'react-redux';
import { addMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { AuthRedirect } from '../../HOC/AuthReducer';
import { AppStateType } from '../../redux/redux-store';
import { DialogType, MessageType } from '../../types/types';




type MapStateToPropsType = {
    dialogsData : Array<DialogType>
    messageData : Array<MessageType>
    newMessageText : string
    isAuth : boolean
}

type MapDispatchPropsType = {
    onMessageChange : (text:string) => void
    addMessage : () => void
}

let mapStateToProps = (state:AppStateType): MapStateToPropsType => {  //  Передаем данные из стейта в функциональную компоненту
    return {
        dialogsData : state.dialogsPage.dialogsData,
        messageData : state.dialogsPage.messageData,
        newMessageText : state.dialogsPage.newMessageText,
        isAuth : state.auth.isAuth,
    }
}

let mapDispatchToProps = (dispatch:any): MapDispatchPropsType => {  // В диспатч передаем вызов функции экшн-кр
    return {
        onMessageChange : (text:string) => {
            dispatch(updateNewMessageTextActionCreator(text));
        },
        addMessage : () => {
            dispatch(addMessageActionCreator()); 
        }
    }
}

let AuthRedirectComponent = AuthRedirect(Dialogs);

const DialogsContainer = connect<MapStateToPropsType,MapDispatchPropsType,null,AppStateType>(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// Создает контейнерную переменную через библиотеку
// f1,f2 передаем функции, которые возвращают объект и передают данные через
// пропсы в компоненту dialogs


export default DialogsContainer;