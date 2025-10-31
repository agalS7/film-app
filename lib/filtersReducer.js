export const DEFAULT_QUERY = "daredevil";

export default function reducer(state, action) {
    switch (action.type) {
        case "SET_QUERY":
            return {
                ...state,
                query: action.payload,
            };
        case "SET_FILTERS":
            return {
                ...state,
                filters: action.payload,
            };
        case "RESET":
            return {
                ...state,
                query: DEFAULT_QUERY,
                filters: {
                    genres: [],
                    language: "all",
                    minimumRating: 0,
                },
            };
    }
    throw Error("Hatalı action: " + action.type);
}
