import axios from "axios";
import {setAlert} from "../alert/alert.actions"
import {AuthActionTypes} from "./auth.types"
import setAuthToken from "../../utils/setAuthToken"

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.get('/auth');
  
      dispatch({
        type: AuthActionTypes.USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AuthActionTypes.AUTH_ERROR
      });
    }
};

// Register User
export const register = ( name, email, password, profession ) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ name, email, password, profession });
    console.log("Went after body")
    try {
      const res = await axios.post('/auth/register', body, config);
  
      dispatch({
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: AuthActionTypes.REGISTER_FAIL
      });
    }
  };

    // Login User
export const login = (email, password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ email, password });
  
    try {
      const res = await axios.post('/auth/login', body, config);
  
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: AuthActionTypes.LOGIN_FAIL
      });
    }
  };

  // User image
  export const updateUserImage = (image) => async dispatch => {
    const formData = new FormData();
    formData.append("image", image)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    try {
      const res = await axios.put("/auth/image", formData, config);


      dispatch({
        type: AuthActionTypes.USER_IMAGE_UPDATED,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (err) {
  
      dispatch({
        type: AuthActionTypes.AUTH_ERROR
      });
    }


  }

  // Get user by his or her id
  export const getUserById = id => async dispatch => {
    try {
      const res = await axios.get(`/auth/${id}`)
      dispatch({
        type: AuthActionTypes.GET_USER_BY_ID,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: AuthActionTypes.AUTH_ERROR
      });
    }
  }

    // Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: AuthActionTypes.LOGOUT });
  }