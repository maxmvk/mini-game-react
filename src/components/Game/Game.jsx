import React from 'react';
import styles from './Game.module.css';
import SettingsContainer from './Settings/SettingsContainer';

const Game = (props) => {

    return (
        <section className={styles.gameSection}>
            <SettingsContainer />
            { props.switchMessage() }
            <div className={styles.gameField}
                 style={{width: props.currentDifficulty? props.difficultyPreset[props.currentDifficulty].field*45: null, 
                         height: props.currentDifficulty? props.difficultyPreset[props.currentDifficulty].field*45: null}}>
                { props.squares.map(s => props.switchSquare(s)) }
            </div>
        </section>
    )
}

export default Game;