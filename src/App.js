import './App.css';
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
<<<<<<< HEAD
=======
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer'
import Loader from './components/preloader/loader';
>>>>>>> parent of 50d0628 (Merge branch 'main' of https://github.com/kolomyaka1/React-Network)


<<<<<<< HEAD
=======
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
                  element={<ProfileContainer />}  // Добавляем нужные функции и данные через props из state
                />
                <Route path='/Profile/:userId'
                  element={<ProfileContainer />}  // Добавляем нужные функции и данные через props из state
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
>>>>>>> parent of 50d0628 (Merge branch 'main' of https://github.com/kolomyaka1/React-Network)

function App(props) {
  return (  // Оборачиваем в тег Browser для того, чтобы наш сайт смог прочитать актуальный URL и отрисовать нужный нам контент
    <BrowserRouter>
      <div className='wrapper'>
        <HeaderContainer />
        <Nav state={props.state.sidebar} />
        <div className='wrapper__content'>
          <Routes >
            <Route path='/Profile'
              element={<Profile />}  // Добавляем нужные функции и данные через props из state
            />
            <Route path='/Profile/:userId'
              element={<ProfileContainer />}  // Добавляем нужные функции и данные через props из state
            />
            <Route path='/Dialogs/*'
              element={<DialogsContainer
                store={props.store}
              />}
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

}

export default App;
