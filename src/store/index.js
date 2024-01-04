import { applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import mainReducer from '../reducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore(
    mainReducer, 
    {}, 
    composeWithDevTools(applyMiddleware(thunk))
)

export default store