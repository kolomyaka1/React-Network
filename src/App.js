import './App.css';
import React from 'react';
import Nav from './components/Nav/Nav';
import ProfileContainer from './components/Profile/ProfileContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import Profile from './components/Profile/Profile';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer'
import Loader from './components/preloader/loader';

class App extends React.Component {
  
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    
    if (this.props.initialized) {
      return (  // Оборачиваем в тег Browser для того, чтобы наш сайт смог прочитать актуальный URL и отрисовать нужный нам контент
        <BrowserRouter>
          <div className='wrapper'>
            <HeaderContainer />
            <Nav friendName={this.props.state.sidebar.friendName} />
            <div className='wrapper__content'>
              <Routes >
                <Route path='/'
                  element={<Profile />}
                />
                <Route path='/Profile'
                  element={<Profile />} 
                />
                <Route path='/Profile/:userId'
                  element={<ProfileContainer />} 
                />
                <Route path='/Dialogs/*'
                  element={<DialogsContainer />}
                />
                <Route path='/Users'
                  element={<UsersContainer />}
                />
                <Route path='/News'
                  element={<News />}
                />
                <Route path='/Music'
                  element={<Music />}
                />
                <Route path='/Settings'
                  element={<Settings />}
                />
                <Route path='/Login'
                  element={<LoginContainer />}
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      );
    } else {
      return (
        <Loader />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  initialized : state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);
