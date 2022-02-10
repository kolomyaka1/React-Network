import { InferActionTypes } from './redux-store'

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    dialogsData:
        [
            { id: 1, name: 'Dmitriy' },
            { id: 2, name: 'Andrey' },
            { id: 3, name: 'Sveta' },
            { id: 4, name: 'Roman' },
            { id: 5, name: 'Jenya' },
            { id: 6, name: 'Nikita' },
            { id: 7, name: 'Kirill' },
            { id: 8, name: 'Artem' },
        ],
    messageData:
        [
            { id: 1, message: 'Hi!' },
            { id: 2, message: 'How are u?' },
            { id: 3, message: 'Whats up!' },
            { id: 4, message: 'Hey, where a u???' }
        ],
    newMessageText: 'Write ur text here!',
}

type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: 4,
                message: state.newMessageText,
            };
            let stateCopy = {...state};
            stateCopy.messageData = [...state.messageData];
            stateCopy.messageData.push(newMessage);
            stateCopy.newMessageText = '';
            return stateCopy;
        }
        case UPDATE_NEW_MESSAGE_TEXT:
            let stateCopy = {...state};
            stateCopy.newMessageText = action.newText;
            return stateCopy;
        default:
            return state;
    }
}

type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {
    addMessageActionCreator : () => ({ type: ADD_MESSAGE } as const),
    updateNewMessageTextActionCreator : (text: string) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text } as const),

}




export default dialogsReducer;