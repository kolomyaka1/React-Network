import { PostsDataType } from "../types/types";



let initialState = {
    postsData : [{
        id : 1,
        message : 'Hello!',
        author : 'Nikita'
    },
    {
        id : 2,
        message : 'Goodbye',
        author : 'Unkown'
    },
    {
        id : 3,
        message : 'Yi',
        author : 'Admin'
    },
] as Array<PostsDataType>
}

export type InitialStateType = typeof initialState

const newsReducer = (state = initialState, action:any): InitialStateType => {
    switch(action.type) {

        default:
            return state;
    }
}

export default newsReducer