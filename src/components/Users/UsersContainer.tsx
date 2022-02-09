import { connect } from 'react-redux';
import { follow, unfollow, toggleIsFollowing } from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import Loader from '../preloader/loader.js';
import {Navigate} from 'react-router-dom'
import { getUsersThunkCreator } from '../../redux/users-reducer';
import { getCurrentPage, getIsAuth, getIsFetching, getIsFollowing, getPageSize, getTotalusersCount, getUsers,  } from '../../redux/user-selectors';
import Pagination from '../Pagination/Pagination';
import s from './users.module.css'
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    pageSize: number
    isFetching: boolean
    currentPage: number
    isFollowing: boolean
    isAuth: boolean
    users: Array<UserType>
    totalUsersCount : number
}

type MapDispatchPropsType = {
    unfollow : (userId:number) => void
    follow : (userId:number) => void
    getUsersThunkCreator : (currentPage:number, pageSize:number) => void


}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType // Объединение всех вход. props

// Можем объявить 3 вида входящих props.
// 1. MapDispatchTP -- Это то, что приходит к нам через connect
// 2. MapStateTP  -- Это то, что приходит к нам через connect
// 3. OwnProps - Это те пропсы, которые мы получаем от родительского элемента 

class UsersAPIComponent extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber:number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }

    
    render() {
        if (!this.props.isAuth) {
            return <Navigate replace to='/Login' />
        }
        return <div>
            <div className={s.page__wrapper}>
            <Pagination totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            />
            </div>
            {this.props.isFetching ? <Loader /> :
                <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    isFollowing={this.props.isFollowing}
                    isAuth={this.props.isAuth}
                />}

        </div>
    }

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalusersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowing : getIsFollowing(state),
        isAuth : getIsAuth(state),
    }
}


export default connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, {follow,unfollow,getUsersThunkCreator,})(UsersAPIComponent);
