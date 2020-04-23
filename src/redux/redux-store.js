import { createStore, combineReducers } from "redux";
import leadersReducer from "./leaders-reducer";
import gameReducer from "./game-reducer";

let reducers = combineReducers({
    leadersState: leadersReducer,
    gameState: gameReducer,
});

let store = createStore(reducers);

export default store;