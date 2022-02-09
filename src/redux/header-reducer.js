
const headerReducer = () => {

    export const getProfile = (id) => {
        return (dispatch) => {
            usersAPI.getProfile(id)
                .then((data) => {
                    dispatch(setUserProfile(data));
                });
        }
    }


    return state;
}

export default headerReducer;