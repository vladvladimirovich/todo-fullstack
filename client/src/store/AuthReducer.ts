const initialState = {authorized: false, loading: true};

function AuthReducer (state = initialState, action: any) { 
    //console.log('auth', action)
    switch(action.type) {


        case "auth/setTrue":
            console.log("set true");
            return {
                ...state,
                authorized: true
            };
        case "auth/setFalse":
            console.log("set false");
            return {
                ...state,
                authorized: false
            };

            case "auth/loading":
                console.log('auth', action)
                return {
                    ...state,
                    loading: action.payload
                }
    }
    return state;
}

export default AuthReducer;