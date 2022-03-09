import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import  {configureStore} from '@reduxjs/toolkit';
import userReducer from "./state/user.js";
import utilityReducer from "./state/utility.js";
import connectionReducer from "./state/connection.js";
import instituteReducer from "./state/institute.js";

const store = configureStore({
  reducer : {
      user : userReducer,
      utility : utilityReducer,
      connection : connectionReducer,
      institute : instituteReducer,
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
