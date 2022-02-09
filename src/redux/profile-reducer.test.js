import profileReducer, { addPostActionCreator, deletePost, updateNewPostTextActionCreator } from "./profile-reducer";

let state = {
    postsData:
        [
            { id: 1, message: 'Hi! How are u?!', likesCounter: 15 },
            { id: 2, message: 'It`s my first post', likesCounter: 7 },
            { id: 3, message: 'I wanna see u', likesCounter: 9 },
            { id: 4, message: 'Ye, we can do it tomorrow!!', likesCounter: 5 },
        ]
}


it('length of posts should be incremented', () => {
    // 1. Test data
    let action = addPostActionCreator();

    // 2. Create action
    let newState = profileReducer(state, action);

    // 3. Expectation 
    expect(newState.postsData.length).toBe(5);
})


it('after delete length of message should be decrement', () => {
    // 1. Test data
    let action = deletePost(1);
    
    // 2. Create action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.postsData.length).toBe(3);
})

