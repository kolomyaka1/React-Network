import {applyMiddleware, combineReducers, createStore} from 'redux';
import authReducer from './auth-reducer';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer';
import newsReducer from './news-reducer';


let reducers = combineReducers({profilePage : profileReducer,
                                dialogsPage : dialogsReducer,
                                sidebar : sidebarReducer,
                                usersPage : usersReducer,
                                auth : authReducer,
                                app : appReducer,
                                news : newsReducer,
                                })


type ReducerType = typeof reducers; // (globalstate : AppStateType) => AppStateType 
export type AppStateType = ReturnType<ReducerType>



let store = createStore(reducers, applyMiddleware(thunkMiddleware));



export default store;