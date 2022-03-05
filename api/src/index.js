import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import  {configureStore} from '@reduxjs/toolkit';
import userReducer from "./state/user.js";
import utilityReducer from "./state/utility.js";

const store = configureStore({
  reducer : {
      user : userReducer,
      utility : utilityReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
