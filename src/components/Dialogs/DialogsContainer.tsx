import { connect } from 'react-redux';
import { actions } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { AuthRedirect } from '../../HOC/AuthRedirect';
import { AppStateType } from '../../redux/redux-store';


let mapStateToProps = (state: AppStateType) => {  //  Передаем данные из стейта в функциональную компоненту
    return {
        dialogsPage : state.dialogsPage,
        newMessageText : state.dialogsPage.newMessageText,
        isAuth : state.auth.isAuth,
    }
}

let mapDispatchToProps = (dispatch: any) => {  // В диспатч передаем вызов функции экшн-кр
    return {
        onMessageChange : (text: string) => {
            dispatch(actions.updateNewMessageTextActionCreator(text));
        },
        addMessage : () => {
            dispatch(actions.addMessageActionCreator()); 
        }
    }
}

let AuthRedirectComponent = AuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// Создает контейнерную переменную через библиотеку
// f1,f2 передаем функции, которые возвращают объект и передают данные через
// пропсы в компоненту dialogs


export default DialogsContainer;