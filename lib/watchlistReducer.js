export default function reducer(state, action) {
    switch (action.type) {
        case "SET_WATCHLIST":
            localStorage.setItem("watchlist", JSON.stringify(action.payload));
            return {
                ...state,
                watchlist: action.payload,
            };
        case "ADD_WATCHLIST":
            const newWatchlist = [...state.watchlist, action.payload];
            localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
            return {
                ...state,
                watchlist: newWatchlist,
            };
        case "REMOVE_WATCHLIST":
            const newWatchlist2 = state.watchlist.filter(
                (show) => show.id !== action.payload,
            );
            localStorage.setItem("watchlist", JSON.stringify(newWatchlist2));
            return {
                ...state,
                watchlist: newWatchlist2,
            };
        case "CLEAR_WATCHLIST":
            localStorage.setItem("watchlist", JSON.stringify([]));
            return {
                ...state,
                watchlist: [],
            };
    }
    throw Error("Hatalı action: " + action.type);
}
