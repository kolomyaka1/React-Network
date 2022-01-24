import { connect } from 'react-redux';
import { follow, unfollow, toggleIsFollowing } from '../../redux/users-reducer';
import React from 'react';
import Users from './Users.jsx';
import Loader from '../preloader/loader.js';
import {Navigate} from 'react-router-dom'
import { getUsersThunkCreator } from '../../redux/users-reducer';
import { getCurrentPage, getIsAuth, getIsFetching, getIsFollowing, getPageSize, getTotalusersCount, getUsers,  } from '../../redux/user-selectors';
import Pagination from '../Pagination/Pagination';
import s from './users.module.css'

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber);
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
                    toggleIsFollowing={this.props.toggleIsFollowing}
                    isFollowing={this.props.isFollowing}
                    isAuth={this.props.isAuth}
                />}

        </div>
    }

}

let mapStateToProps = (state) => {
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


export default connect(mapStateToProps, {
    follow,
    unfollow,
    toggleIsFollowing,
    getUsersThunkCreator,
})(UsersAPIComponent);