import { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    authorized: boolean,
    loading: boolean,
}
const initialState : AuthState = {authorized: false, loading: true};

function AuthReducer (state = initialState, action: PayloadAction<boolean>) { 
    //console.log('auth', action)
    switch(action.type) {


        case "auth/setTrue":
            return {
                ...state,
                authorized: true
            };
        case "auth/setFalse":
            return {
                ...state,
                authorized: false
            };

            case "auth/loading":
                return {
                    ...state,
                    loading: action.payload
                }
    }
    return state;
}

export default AuthReducer;