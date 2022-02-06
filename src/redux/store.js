import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import newsReducer from './news-reducer';

let store = {
    _state: {
        profilePage: {
            postsData:
                [
                    { id: 1, message: 'Hi! How are u?!', likesCounter: 15 },
                    { id: 2, message: 'It`s my first post', likesCounter: 7 },
                    { id: 3, message: 'I wanna see u', likesCounter: 9 },
                    { id: 4, message: 'Ye, we can do it tomorrow!!', likesCounter: 5 },
                ],
            newPostText: 'Write ur text here!',
        },
        dialogsPage: {
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
        },
        sidebar: {
            friendName:
                [
                    { id: 1, name: 'Jenya' },
                    { id: 2, name: 'Danya' },
                    { id: 3, name: 'Misha' },
                ]
        },
        news : {
            
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('State changed');
    },
    subscribe(observer) {
        this._callSubscriber = observer;  // Наблюдатель - паттерн
    },
    dispatch(action) {  // action - Объект, который описывает что надо сделать
                        // { type: 'ADD POST' }
        
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._state.news = newsReducer(this._state.news, action);
        this._callSubscriber(this._state);
    }
}



export default store;
