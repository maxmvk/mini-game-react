const TOOGLE_SQUARE = "TOOGLE_SQUARE";
const HIGHLIGHT_SQUARE = "HIGHLIGHT_SQUARE";
const SET_SQUARES = "SET_SQUARES";
const SET_CALC_SQUARES = "SET_CALC_SQUARES";
const MISS_SQUARE = "MISS_SQUARE";
const ADD_PLAYER_POINT = "ADD_PLAYER_POINT";
const ADD_COMPUTER_POINT = "ADD_COMPUTER_POINT";
const REFRESH_POINTS = "REFRESH_POINTS";
const SET_DROPDOWN_GAME_MODE = "SET_DROPDOWN_GAME_MODE";
const SET_DIFFICULTY_PRESET = "SET_DIFFICULTY_PRESET";
const SET_CURRENT_DIFFICULTY = "SET_CURRENT_DIFFICULTY";
const SET_PLAYER_NAME = "SET_PLAYER_NAME";
const SET_IS_NAME_VALID = "SET_IS_NAME_VALID";
const SET_IS_GAME_STARTED = "SET_IS_GAME_STARTED";
const SET_IS_PLAYED_ONCE = "SET_IS_PLAYED_ONCE"

let initialState = {
    squares: [],
    calcSquares: [],
    points: {player: 0, computer: 0},
    difficultyPreset: {},
    currentDifficulty: null,
    isDropdownGameMode: false,
    playerName: "",
    isNameValid: false,
    isGameStarted: false,
    isPlayedOnce: false
}

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SQUARES: {
            return {...state, squares: action.squares }
        }

        case SET_CALC_SQUARES: {
            return {...state, calcSquares: action.calcSquares }
        }

        case TOOGLE_SQUARE:
            return {
                ...state,
                squares: state.squares.map( s => {
                    if(s.id === action.squareId) {
                        return {...s, type: "selected"}
                    }
                    return s;
                })
            };

        case HIGHLIGHT_SQUARE:
            return {
                ...state,
                squares: state.squares.map( s => {
                    if(s.id === action.squareId) {
                        return {...s, type: "highlighted"}
                    }
                    return s;
                })
            };

        case MISS_SQUARE:
            return {
                ...state,
                squares: state.squares.map( s => {
                    if(s.id === action.squareId) {
                        return {...s, type: "missed"}
                    }
                    return s;
                })
            };

        case ADD_PLAYER_POINT:
            return {...state, points: {...state.points, player: ++state.points.player} }

        case ADD_COMPUTER_POINT:
            return {...state, points: {...state.points, computer: ++state.points.computer} }

        case REFRESH_POINTS:
            return {...state, points: {player: 0, computer: 0} }

        case SET_DROPDOWN_GAME_MODE:
            return {...state, isDropdownGameMode: action.isDropdownGameMode }

        case SET_DIFFICULTY_PRESET:
            return {...state, difficultyPreset: action.difficultyPreset }

        case SET_CURRENT_DIFFICULTY:
            return {...state, currentDifficulty: action.currentDifficulty }

        case SET_PLAYER_NAME:
            return {...state, playerName: action.playerName }

        case SET_IS_NAME_VALID:
            return {...state, isNameValid: action.isNameValid }

        case SET_IS_GAME_STARTED:
            return {...state, isGameStarted: action.isGameStarted }

        case SET_IS_PLAYED_ONCE:
            return {...state, isPlayedOnce: action.isPlayedOnce }

        default:
            return state;
    }
}

export const setSquares = (squares) => ({ type: SET_SQUARES, squares })
export const setCalcSquares = (calcSquares) => ({ type: SET_CALC_SQUARES, calcSquares })
export const toogleSquare = (squareId) => ({ type: TOOGLE_SQUARE, squareId })
export const highlightSquare = (squareId) => ({ type: HIGHLIGHT_SQUARE, squareId })
export const missSquare = (squareId) => ({ type: MISS_SQUARE, squareId })
export const addPlayerPoint = () => ({ type: ADD_PLAYER_POINT })
export const addComputerPoint = () => ({ type: ADD_COMPUTER_POINT })
export const refreshPoints = () => ({ type: REFRESH_POINTS })
export const setDropdownGameMode = (isDropdownGameMode) => ({ type: SET_DROPDOWN_GAME_MODE, isDropdownGameMode })
export const setDifficultyPreset = (difficultyPreset) => ({ type: SET_DIFFICULTY_PRESET, difficultyPreset })
export const setCurrentDifficulty = (currentDifficulty) => ({ type: SET_CURRENT_DIFFICULTY, currentDifficulty })
export const setPlayerName = (playerName) => ({ type: SET_PLAYER_NAME, playerName })
export const setIsNameValid = (isNameValid) => ({ type: SET_IS_NAME_VALID, isNameValid })
export const setIsGameStarted = (isGameStarted) => ({ type: SET_IS_GAME_STARTED, isGameStarted })
export const setIsPlayedOnce = (isPlayedOnce) => ({ type: SET_IS_PLAYED_ONCE, isPlayedOnce })

export default gameReducer;