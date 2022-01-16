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
import LoginContainer from './components/Login/Login';
import { Formik } from 'formik';
import s from './components/Login/Login.module.css'
import * as yup from 'yup'


function App(props) {
  const validationsSchema = yup.object().shape({
    name: yup.string().typeError('Должно быть строкой').required('Обязательно')
  })
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
              element={<Formik
                initialValue={{
                  email: '',
                  password: '',
                }}
                validateOnBlur
                onSubmit={(values) => { console.log(values) }}
                validationsSchema={validationsSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                  <div className={s.login__block}>
                    <form>
                      <h2 className={s.login__title}>LOGIN</h2>
                      <label htmlFor={'email'}>Email</label><br />
                      <input
                        type={'email'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.email}
                        name={'email'}
                      /><br/>
                      {touched.email && errors.email && <p>{errors.name}</p>}
                      <label className={s.login__password}>Password</label><br />
                      <input
                       type={'password'}
                       defaultValue={values.password}
                      />
                      <div className={s.login__button}><button disabled={!isValid && !dirty} onClick={handleBlur} className={s.login__button1} type={'submit'}>Войти</button></div>
                    </form>
                  </div>
                )}
              </Formik>}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );

}

export default App;
