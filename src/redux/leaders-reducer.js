const SET_WINNERS = "SET_WINNERS";

let initialState = {
    winners: [ ],
}

const leadersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WINNERS: {
            return {...state, winners: [action.winner, ...state.winners]}
        }

        default:
            return state;
    }
}

export const setWinners = (winner) => ({ type: SET_WINNERS, winner })

export default leadersReducer;