import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';





let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App state={state} dispatch={store.dispatch.bind(store)} 
        store={store} />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


rerenderEntireTree(store.getState());  // Ререндерим нашу страницу, и используем данную функцию
// При каждй нужной возможности снова отрендерить нашу страничук, так же избавляемся от
// Цикличной зависимости, с помощью добавления данного js-файла.

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});

reportWebVitals();

