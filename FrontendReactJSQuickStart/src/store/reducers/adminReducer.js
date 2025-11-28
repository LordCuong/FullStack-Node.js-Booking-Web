import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],

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

        default:
            return state;
    }
}

export default adminReducer;