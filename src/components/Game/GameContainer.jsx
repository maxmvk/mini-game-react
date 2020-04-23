import React from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import styles from './Game.module.css';
import { toogleSquare, addPlayerPoint } from '../../redux/game-reducer';

class GameContainer extends React.Component {

    onToogleSquare = (id) => {
        this.props.toogleSquare(id)
        this.props.addPlayerPoint()
    }

    switchSquare = (square) => {
        switch (square.type) {
            case "highlighted":
                return <div onClick={() => { this.onToogleSquare(square.id) }} className={styles.highlightedSquare}></div>
        
            case "selected":
                return <div className={styles.selectedSquare}></div>
        
            case "missed":
                return <div className={styles.missedSquare}></div>
        
            default:
                return <div className={styles.regularSquare}></div>
        }
    }

    switchMessage = () => {
        if(this.props.points.player>this.props.squares.length/2) {
            return <div className={styles.message}>{this.props.playerName} won</div>
        }
        else if(this.props.points.computer>this.props.squares.length/2) {
            return <div className={styles.message}>Computer won</div>
        }
        else return <div className={styles.message}></div>
    }

    render() {
        return (
            <Game squares={this.props.squares}
                  switchSquare={this.switchSquare}
                  difficultyPreset={this.props.difficultyPreset}
                  currentDifficulty={this.props.currentDifficulty}
                  switchMessage={this.switchMessage}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        squares: state.gameState.squares,
        points: state.gameState.points,
        difficultyPreset: state.gameState.difficultyPreset,
        currentDifficulty: state.gameState.currentDifficulty,
        playerName: state.gameState.playerName
    }
}

export default connect(mapStateToProps, { toogleSquare, addPlayerPoint })(GameContainer);