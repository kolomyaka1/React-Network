import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './../Dialogs/Dialogs.module.css';
import Message from './Message/Message';




let Dialogs = (props) => {
    
    let DialogsElements = props.dialogsPage.dialogsData.map(dialog =>
        (<DialogItem name={dialog.name} id={dialog.id} />)
    )

    let MessagesElements = props.dialogsPage.messageData.map(el =>
        (<Message message={el.message} />)
    )

    let newDialogElement = React.createRef();

    let addMessage = () => {
        props.addMessage()
        newDialogElement.current.value = '';
    }

    let onMessageChange = (e) => {
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
                    <textarea 
                    onChange={onMessageChange}
                    className={s.dialogs__add} 
                    ref={ newDialogElement }
                    value={props.newMessageText}
                    />
                    <button onClick={ addMessage }>Send</button>
                </div>


            </div>


        </div>
    )
}

export default Dialogs;