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
import NavContainer from './components/Nav/NavContainer';


const App: React.FC = () => {
  return (  // Оборачиваем в тег Browser для того, чтобы наш сайт смог прочитать актуальный URL и отрисовать нужный нам контент
    <BrowserRouter>
      <div className='wrapper'>
        <HeaderContainer />
        <NavContainer />
        <div className='wrapper__content'>
          <Routes >
            <Route path='/' element={<Profile />} />
            <Route path='/Profile'
              element={<Profile />}  // Добавляем нужные функции и данные через props из state
            />
            <Route path='/Profile/:userId'
              element={<ProfileContainer />}  // Добавляем нужные функции и данные через props из state
            />
            <Route path='/Dialogs/*'
              element={<DialogsContainer
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
