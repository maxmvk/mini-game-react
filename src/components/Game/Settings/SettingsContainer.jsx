import React from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { highlightSquare, setSquares, setCalcSquares, missSquare, addComputerPoint, 
         refreshPoints, setDropdownGameMode, setDifficultyPreset, setCurrentDifficulty, 
         setPlayerName, setIsNameValid, setIsGameStarted, setIsPlayedOnce } from '../../../redux/game-reducer';
import { setWinners } from '../../../redux/leaders-reducer';
import Settings from './Settings';

class SettingsContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://starnavi-frontend-test-task.herokuapp.com/game-settings`).then(response => {
            this.props.setDifficultyPreset(response.data);
        })
    }

    getDate() {
        let now = new Date();
        let minute = now.getMinutes();
        let hour = now.getHours();
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        let month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
        return hour+":"+minute+"; "+now.getDate()+" "+month[now.getMonth()]+" "+now.getFullYear()
    }

    setGameField = (difficulty) => {
        const field = this.props.difficultyPreset[difficulty].field
        const squaresArr = [];
        for (let index = 0; index < field*field; index++) {
            squaresArr.push({id: index+1, type: "regular"})
        }
        return squaresArr
    }

    onSetCurrentDifficulty = (difficulty) => {
        this.props.refreshPoints()
        this.props.setCurrentDifficulty(difficulty) 
        this.props.setSquares(this.setGameField(difficulty))
        this.props.setCalcSquares(this.setGameField(difficulty))
        this.props.setDropdownGameMode(false)
    }

    handleUserInput = (e) => {
        const value = e.target.value;
        this.props.setPlayerName(value);
        if(value.length>0) {
            this.props.setIsNameValid(true)
        }
        else this.props.setIsNameValid(false)
    }

    onPlay = () => {
        this.props.refreshPoints()
        this.props.setSquares(this.setGameField(this.props.currentDifficulty))
        this.onHighlightSquare()
        this.props.setIsGameStarted(true)
    }

    generateRandomHighlight = () => {
        const calcSquares = this.props.calcSquares.map(item => item)
        const rand = Math.floor(Math.random() * this.props.calcSquares.length);
        this.props.highlightSquare(this.props.calcSquares[rand].id)
        calcSquares.splice(rand, 1);
        this.props.setCalcSquares(calcSquares)
    }

    onHighlightSquare = () => {
        this.generateRandomHighlight()
        setTimeout(() => {
            this.onMissSquare()
            if((this.props.points.computer<=this.props.squares.length/2)&&(this.props.points.player<=this.props.squares.length/2)) {
                this.onHighlightSquare()
            }
            if((this.props.points.computer>this.props.squares.length/2)) {
                this.props.setIsGameStarted(false)
                this.props.setIsPlayedOnce(true)
                this.props.setCalcSquares(this.props.squares)
                axios.post(`https://starnavi-frontend-test-task.herokuapp.com/winners`, {
                    id: Math.random(),
                    winner: "Computer",
                    date: this.getDate()
                }).then(response => {
                    this.props.setWinners(response.data[response.data.length-1]);
                })
            }
            if((this.props.points.player>this.props.squares.length/2)) {
                this.props.setIsGameStarted(false)
                this.props.setIsPlayedOnce(true)
                this.props.setCalcSquares(this.props.squares)
                axios.post(`https://starnavi-frontend-test-task.herokuapp.com/winners`, {
                    id: Math.random(),
                    winner: this.props.playerName,
                    date: this.getDate()
                }).then(response => {
                    this.props.setWinners(response.data[response.data.length-1]);
                })
            }
        }, this.props.difficultyPreset[this.props.currentDifficulty].delay);
    }

    onMissSquare = () => {
        this.props.squares.map(s => {
            if(s.type === "highlighted") {
                this.props.missSquare(s.id)
                this.props.addComputerPoint()
            }
        })
    }

    render() {
        return (
            <Settings 
                  onPlay={this.onPlay}
                  isDropdownGameMode={this.props.isDropdownGameMode}
                  setDropdownGameMode={this.props.setDropdownGameMode}
                  difficultyPreset={this.props.difficultyPreset}
                  currentDifficulty={this.props.currentDifficulty}
                  onSetCurrentDifficulty={this.onSetCurrentDifficulty}
                  handleUserInput={this.handleUserInput}
                  playerName={this.props.playerName}
                  isNameValid={this.props.isNameValid}
                  isGameStarted={this.props.isGameStarted}
                  isPlayedOnce={this.props.isPlayedOnce}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        squares: state.gameState.squares,
        calcSquares: state.gameState.calcSquares,
        points: state.gameState.points,
        isDropdownGameMode: state.gameState.isDropdownGameMode,
        difficultyPreset: state.gameState.difficultyPreset,
        currentDifficulty: state.gameState.currentDifficulty,
        playerName: state.gameState.playerName,
        isNameValid: state.gameState.isNameValid,
        isGameStarted: state.gameState.isGameStarted,
        isPlayedOnce: state.gameState.isPlayedOnce
    }
}

export default connect(mapStateToProps, { highlightSquare, setSquares, setCalcSquares, missSquare, addComputerPoint, 
                                          refreshPoints, setDropdownGameMode, setDifficultyPreset, setCurrentDifficulty, 
                                          setPlayerName, setIsNameValid, setIsGameStarted, setIsPlayedOnce, setWinners })(SettingsContainer);