import { connect } from 'react-redux';
import { follow, unfollow } from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import Loader from '../preloader/loader';
import {Navigate} from 'react-router-dom'
import { getUsersThunkCreator } from '../../redux/users-reducer';
import { AppStateType } from '../../redux/redux-store';
import { UserType } from '../../types/types';



type OwnPropsType = {
    users : Array<UserType>
    currentPage : number
    pageSize : number
    isAuth : boolean
    isFetching : boolean
    totalUsersCount : number
    followed : boolean
    follow : (id: number) => void
    unfollow : (id: number) => void
    getUsersThunkCreator : (currentPage : number, pageNumber? : number, pageSize? : number) => void
}

class UsersAPIComponent extends React.Component<OwnPropsType, AppStateType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber:number) => {
        this.props.getUsersThunkCreator(pageNumber);
    }

    
    render() {
        if (!this.props.isAuth) {
            return <Navigate replace to='/Login' />
        }
        return <>
            {this.props.isFetching ? <Loader /> :
                <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    isAuth={this.props.isAuth}
                    
                />}

        </>
    }

}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followed : state.usersPage.followed,
        isAuth : state.auth.isAuth,
    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    getUsersThunkCreator,
    // @ts-ignore
})(UsersAPIComponent);