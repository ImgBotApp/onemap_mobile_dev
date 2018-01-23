import * as types from './actionType'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  
});

export default function app(state = initialState, action ={}) {
  switch(action.type) {
    case types.STORE_USER_INFO:
      return state.merge({
        ...action.userInfo
      });
    default: 
      return state;
  }
}