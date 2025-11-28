import actionTypes from './actionTypes';
import { createNewUserService, getAllCodeService } from '../../services/userService';
export const fecthGenderStart = () => {
    return async (dispatch, getstate) => {
        try {
            dispatch({ type: actionTypes.FECTH_GENDER_START });
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fecthGenderSuccess(res.data));
            }
            else {
                dispatch(fecthGenderFailed());
            }
        } catch (e) {
            dispatch(fecthGenderFailed());
            console.log("fecthgenderstart error: ", e)
        }

    }
}
export const fecthGenderSuccess = (genderData) => ({
    type: actionTypes.FECTH_GENDER_SUCCESS,
    data: genderData,
})
export const fecthGenderFailed = () => ({
    type: actionTypes.FECTH_GENDER_FAILED
})

export const fecthPositionStart = () => {
    return async (dispatch, getstate) => {
        try {
            // dispatch( {type: actionTypes.FECTH_POSITION_START});
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fecthPositionSuccess(res.data));
            }
            else {
                dispatch(fecthPositionFailed());
            }
        } catch (e) {
            dispatch(fecthPositionFailed());
            console.log("fecthgenderstart error: ", e)
        }

    }
}

export const fecthPositionSuccess = (positionData) => ({
    type: actionTypes.FECTH_POSITION_SUCCESS,
    data: positionData,
})
export const fecthPositionFailed = () => ({
    type: actionTypes.FECTH_POSITION_FAILED
})

export const fecthRoleStart = () => {
    return async (dispatch, getstate) => {
        try {
            // dispatch( {type: actionTypes.FECTH_ROLE_START});
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fecthRoleSuccess(res.data));
            }
            else {
                dispatch(fecthRoleFailed());
            }
        } catch (e) {
            dispatch(fecthRoleFailed());
            console.log("fecthgenderstart error: ", e)
        }

    }
}
export const fecthRoleSuccess = (roleData) => ({
    type: actionTypes.FECTH_ROLE_SUCCESS,
    data: roleData,
})
export const fecthRoleFailed = () => ({
    type: actionTypes.FECTH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getstate) => {
        try {
            // dispatch( {type: actionTypes.FECTH_ROLE_START});
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
            }
            else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("fecthgenderstart error: ", e)
        }

    }
}
export const saveUserSuccess=()=>({
    type: 'CREATE_USER_SUCCESS',

})
export const saveUserFailed=()=>({
    type: 'CREATE_USER_FAILED'
})