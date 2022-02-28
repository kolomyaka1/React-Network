import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './auth-reducer';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
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
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunkType<A extends Action = Action,R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.__store__ = store

export default store;