import { connect } from 'react-redux';
import { follow, unfollow, toggleIsFollowing } from '../../redux/users-reducer';
import React from 'react';
import Users from './Users.jsx';
import Loader from '../preloader/loader.js';
import {Navigate} from 'react-router-dom'
import { getUsersThunkCreator } from '../../redux/users-reducer';
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
        return <>
        
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

        </>
    }

}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowing : state.usersPage.isFollowing,
        isAuth : state.auth.isAuth,
    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    toggleIsFollowing,
    getUsersThunkCreator,
})(UsersAPIComponent);