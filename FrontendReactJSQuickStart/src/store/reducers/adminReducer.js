import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FECTH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            // console.log("fecth genderstart: ", action)
            return {
                ...copyState,

            }
        case actionTypes.FECTH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false
            // console.log("fecth gendersuccess: ", state)

            return {
                ...state,

            }
        case actionTypes.FECTH_GENDER_FAILED:
            state.genders = [];
            state.isLoadingGender = false;
            // console.log("fecth genderfailed: ", action)

            return {
                ...state,

            }
        case actionTypes.FECTH_POSITION_SUCCESS:
            state.positions = action.data;
            // console.log("fecth gendersuccess: ", state)

            return {
                ...state,

            }
        case actionTypes.FECTH_POSITION_FAILED:
            state.positions = [];
            // console.log("fecth genderfailed: ", action)

            return {
                ...state,

            }
        case actionTypes.FECTH_ROLE_SUCCESS:
            state.roles = action.data;
            // console.log("fecth gendersuccess: ", state)

            return {
                ...state,

            }
        case actionTypes.FECTH_ROLE_FAILED:
            state.roles = [];
            // console.log("fecth genderfailed: ", action)

            return {
                ...state,

            }
        case actionTypes.FECTH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FECTH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            }

        case actionTypes.FECTH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FECTH_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FECTH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            }
        case actionTypes.FECTH_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            }
        case actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state,
            }
        case actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;