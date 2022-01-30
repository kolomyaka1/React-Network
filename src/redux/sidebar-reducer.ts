import { FriendNameType } from "../types/types";


let initialState = {
    friendName:
        [
            { id: 1, name: 'Jenya' },
            { id: 2, name: 'Danya' },
            { id: 3, name: 'Misha' },
        ] as Array<FriendNameType>
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action:any): InitialStateType => {
    return state;
}

export default sidebarReducer;