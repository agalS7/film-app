export default function showsReducer(state, action) {
    switch (action.type) {
        case "FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                shows: action.payload,
                page: 0,
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case "SET_PAGE":
            return {
                ...state,
                page: action.payload,
            };
    }
    throw Error("Hatalı action: " + action.type);
}
