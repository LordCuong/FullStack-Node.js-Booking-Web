import actionTypes from './actionTypes';
import { createNewUserService, deleteUserService, editUserService, getAllCodeService, getAllDoctors, getAllUsers, getTopDoctorHomeService, saveDetailDoctorsService } from '../../services/userService';
import { toast } from 'react-toastify';
import { dispatch } from '../../redux';
/// gender 
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

// position
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
            console.log("fecthpositionstart error: ", e)
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

//role
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
            console.log("fecthrolestart error: ", e)
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


//create user
export const createNewUser = (data) => {
    return async (dispatch, getstate) => {
        try {
            // dispatch( {type: actionTypes.FECTH_ROLE_START});
            let res = await createNewUserService(data);
            // console.log("check create user redux:  ", res)
            if (res && res.errCode === 0) {
                toast.success("create new user successfully!");
                dispatch(saveUserSuccess());
                dispatch(fecthAllUsersStart());
            }
            else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("create users error: ", e)
        }

    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

/// get user
export const fecthAllUsersStart = () => {
    return async (dispatch, getstate) => {
        try {
            // dispatch( {type: actionTypes.FECTH_ROLE_START});
            let res = await getAllUsers("ALL");
            // let res1 = await getTopDoctorHomeService(3);
            // console.log('check res get top doctor home: ', res1);
            if (res && res.errCode === 0) {
                dispatch(fecthAllUsersSuccess(res.users.reverse()));  // sort user by desc = reversed()
            }
            else {
                toast.error("fetch all user failed!");
                dispatch(fecthAllusersFailed());
            }
        } catch (e) {
            toast.error("fetch all user failed!");
            dispatch(fecthAllusersFailed());
            console.log("fecthAllusersstart error: ", e)
        }

    }
}
export const fecthAllUsersSuccess = (data) => ({
    type: actionTypes.FECTH_ALL_USERS_SUCCESS,
    users: data
})
export const fecthAllusersFailed = () => ({
    type: actionTypes.FECTH_ALL_USERS_FAILED
})

/// delete user 
export const deleteAUser = (userId) => {
    return async (dispatch, getstate) => {
        try {
            // dispatch( {type: actionTypes.FECTH_ROLE_START});
            let res = await deleteUserService(userId);
            // console.log("check create user redux:  ", res)
            if (res && res.errCode === 0) {
                toast.success("delete user successfully!");
                dispatch(deleteUserSuccess());
                dispatch(fecthAllUsersStart());
            }
            else {
                toast.error("delete user failed!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("delete user failed!");
            dispatch(deleteUserFailed());
            console.log("delete users error: ", e)
        }
    }
}
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

//edit user
export const editAUser = (data) => {
    return async (dispatch, getstate) => {
        try {
            // dispatch( {type: actionTypes.FECTH_ROLE_START});
            let res = await editUserService(data);
            // console.log("check create user redux:  ", res)
            if (res && res.errCode === 0) {
                toast.success("update user successfully!");
                dispatch(editUserSuccess());
                dispatch(fecthAllUsersStart());
            }
            else {
                toast.error("update user failed!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("update user failed!");
            dispatch(editUserFailed());
            console.log("update users error: ", e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})

//doctor 
export const fecthTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FECTH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FECTH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('fecth top doctor failed: ', e);
            dispatch({
                type: actionTypes.FECTH_TOP_DOCTOR_FAILED,
            })

        }
    }
}

export const fecthAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {

                dispatch({
                    type: actionTypes.FECTH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FECTH_All_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('fecth All doctor failed: ', e);
            dispatch({
                type: actionTypes.FECTH_TOP_DOCTOR_FAILED,
            })

        }
    }
}

export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorsService(data);
            if (res && res.errCode === 0) {
                toast.success("save infor detail doctor successfully!");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }
            else {
                toast.error("save infor detail doctor error!");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error("save infor detail doctor error!");

            console.log('save detail doctor failed: ', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })

        }
    }
}

// time 

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                });
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            });
        }
    };
};

// DOCTOR INFOR
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService("PRICE")
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            if (resPrice && resPrice.errCode === 0 && resPayment.errCode === 0 && resProvince.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            }
            else {
                dispatch(fetchRequiredDoctorInforFailed())
            }
        }
        catch (e) {
            dispatch(fetchRequiredDoctorInforFailed())
            console.log(e);
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: data
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_FAILED,
})