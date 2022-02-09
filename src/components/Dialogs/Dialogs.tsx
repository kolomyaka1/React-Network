import React, { ChangeEvent, FC } from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './../Dialogs/Dialogs.module.css';
import Message from './Message/Message';
import { DialogType, MessageType } from '../../types/types';


type PropsType = {
    dialogsData : Array<DialogType>
    messageData : Array<MessageType>
    newMessageText : string
    onMessageChange : (text:string) => void
    addMessage : () => void
}

let Dialogs: FC<PropsType> = (props) => {
    
    let DialogsElements = props.dialogsData.map(dialog =>
        (<DialogItem name={dialog.name} id={dialog.id} />)
    )

    let MessagesElements = props.messageData.map(el =>
        (<Message message={el.message} />)
    )

    let newDialogElement = React.createRef<any>();

    let addMessage = () => {
        props.addMessage()
        newDialogElement.current.value = '';
    }

    let onMessageChange = (e:ChangeEvent<HTMLInputElement>) => {
        let text = newDialogElement.current.value;
        props.onMessageChange(text)
    }
    
    return (
        <div className={s.dialogs__wrapper}>
            <div className={s.dialogs__item}>

                {DialogsElements}

            </div>
            <div className={s.line}></div>
            <div className={s.dialogs__messages}>

                {MessagesElements}          
                
                <div className={s.dialog__send__message}>
                    <input
                    type='text' 
                    onChange={onMessageChange}
                    className={s.dialogs__add} 
                    ref={ newDialogElement }
                    value={props.newMessageText}
                    placeholder='Message...'
                    />
                    <button onClick={ addMessage } className={s.dialogs__button}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;