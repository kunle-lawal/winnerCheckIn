import checkInReducer from './checkInReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    checkIn: checkInReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer