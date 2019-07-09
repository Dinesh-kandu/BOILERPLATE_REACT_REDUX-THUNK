import axios from 'axios';
import { success, error } from 'react-notification-system-redux';
import { push } from 'connected-react-router';
import { CHANGE_LOADING } from '../loading/constant';
import { makeConstantCreator } from '../reduxCreator';

export const ProfileTypes = makeConstantCreator(
  'GET_PROFILE',
  'PROFILE_ERROR',
  'UPDATE_PROFILE',
  'DELETE_ACCOUNT',
  'GET_PROFILES',
  'GET_REPOS',
  'CLEAR_PROFILE',
);

export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: ProfileTypes.GET_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.get('/api/profile');
    dispatch({
      type: ProfileTypes.GET_PROFILES,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};

export const getProfileById = userId => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: ProfileTypes.GET_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};

export const getGithubRepos = username => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: ProfileTypes.GET_REPOS,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (err) {
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const createProfile = (formData, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: ProfileTypes.GET_PROFILE,
      payload: res.data,
    });
    dispatch(
      success({
        title: 'Done',
        message: edit ? 'Profile Updated' : 'Profile Created',
        autoDismiss: 1,
      }),
    );
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });

    if (edit) {
      dispatch(push('/dashboard'));
    }
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach(
        error({
          title: 'Error',
          message: error.msg,
          autoDismiss: 1,
        }),
      );
    }
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addExperience = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: ProfileTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
    dispatch(
      success({
        title: 'Done',
        message: 'Exexperience Added',
        autoDismiss: 1,
      }),
    );
    dispatch(push('/dashboard'));
  } catch (err) {
    console.log(err);
    const { errors } = err.response;

    if (errors) {
      errors.forEach(
        success({
          title: 'Done',
          message: error.msg,
          autoDismiss: 1,
        }),
      );
    }
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addEducation = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: ProfileTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
    dispatch(
      success({
        title: 'Done',
        message: 'Education Added',
        autoDismiss: 1,
      }),
    );
    dispatch(push('/dashboard'));
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(
          error({
            title: 'Done',
            message: error.msg,
            autoDismiss: 1,
          }),
        ));
    }
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: ProfileTypes.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(
      success({
        title: 'Done',
        message: 'Experience Removed',
        autoDismiss: 1,
      }),
    );
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteEducation = id => async dispatch => {
  console.log(id);
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    const res = await axios.delete(`/api/profile/education/${id}`);
    console.log(res.data);
    dispatch({
      type: ProfileTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
    dispatch(
      success({
        title: 'Done',
        message: 'Education Removed',
        autoDismiss: 1,
      }),
    );
  } catch (error) {
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteAccount = () => async dispatch => {
  try {
    dispatch({
      type: CHANGE_LOADING,
      payload: true,
    });
    await axios.delete('/api/profile');
    dispatch({ type: ProfileTypes.CLEAR_PROFILE });
    dispatch({ type: ProfileTypes.DELETE_ACCOUNT });

    dispatch(
      success({
        title: 'Done',
        message: 'Deleted Success',
        autoDismiss: 1,
      }),
    );
    dispatch({
      type: CHANGE_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: ProfileTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
