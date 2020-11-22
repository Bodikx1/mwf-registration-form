import { SET_USER, SET_ERRORS, LOADING_UI, CLEAR_ERRORS, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';
import { createUser } from '../../services/apiService'
import { FormFields } from '../../pages/Signup';

export const signUpUser = (userData: FormFields, history: any) => (dispatch: any) => {
  const { useremail, username, password } = userData;
  dispatch({ type: LOADING_UI })
  createUser({
    userId: useremail,
    name: username,
    password: password
  })
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
      history.push('/'); // redirecting to index page after login success
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
}