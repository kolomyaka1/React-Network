import {applyMiddleware, combineReducers, createStore} from 'redux';
import authReducer from './auth-reducer';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import thunkMiddleware from 'redux-thunk';


let reducers = combineReducers({profilePage : profileReducer,
                                dialogsPage : dialogsReducer,
                                sidebar : sidebarReducer,
                                usersPage : usersReducer,
                                auth : authReducer,
<<<<<<< HEAD:src/redux/redux-store.ts
                                app : appReducer,
                                news : newsReducer,
                                })


type ReducerType = typeof reducers; // (globalstate : AppStateType) => AppStateType 
export type AppStateType = ReturnType<ReducerType>


=======
                                });
>>>>>>> parent of 1af126a (Merge branch 'main' of https://github.com/kolomyaka1/React-Network):src/redux/redux-store.js

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;