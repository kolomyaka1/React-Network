import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './../Dialogs/Dialogs.module.css';
import Message from './Message/Message';
import { DialogType, MessageType } from '../../types/types';

type OwnPropsType = {
    newMessageText : string
    isAuth : boolean
    dialogsData : Array<DialogType>
    messageData : Array<MessageType>
    addMessage : () => void
    onMessageChange : (text: string) => void
}


let Dialogs: React.FC<OwnPropsType> = (props) => {
    
    let DialogsElements = props.dialogsData.map(dialog =>
        (<DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />)
    )

    let MessagesElements = props.messageData.map(el =>
        (<Message key={el.id} message={el.message} />)
    )

    let newDialogElement = React.createRef<HTMLTextAreaElement>();

    let addMessage = () => {
        props.addMessage()
        if (newDialogElement.current) {
        newDialogElement.current.value = '';
        }
    }

    let onMessageChange = () => {
        if (newDialogElement.current) {
        let text = newDialogElement.current.value;
        props.onMessageChange(text)
        }
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
                    <textarea 
                    onChange={onMessageChange}
                    className={s.dialogs__add} 
                    ref={ newDialogElement }
                    value={props.newMessageText}
                    />
                    <button onClick={ addMessage } className='button1'>Send</button>
                </div>


            </div>


        </div>
    )
}

export default Dialogs;